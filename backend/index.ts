import express from "express";
import expressWs from 'express-ws';
import cors from 'cors';
import mongoose from "mongoose";
import config from "./config";
import usersRouter from './routers/users';
import projectsRouter from './routers/projects';
import tasksRouter from './routers/tasks';
import milestonesRouter from './routers/milestones';
import {ActiveConnections, IncomingMessage, UserMessage} from './types';
import crypto from 'crypto';
import User from './models/User';
import Message from './models/Message';

const app = express();
const port = 8000;
const router = express.Router();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
app.use('/milestones', milestonesRouter);
expressWs(app);

const activeConnections: ActiveConnections = {};

router.ws('/chat', async (ws) => {
    const id = crypto.randomUUID();
    activeConnections[id] = ws;
    console.log('Client connected! id =', id);
    const users = await User.find({online: true}).select('displayName');
    if (users) {
        Object.keys(activeConnections).forEach(id => {
            const conn = activeConnections[id];
            conn.send(JSON.stringify({
                type: 'ONLINE_USERS',
                payload: users,
            }));
        });
    }
    ws.on('message', async (messages) => {
        const decodeMessage = JSON.parse(messages.toString()) as IncomingMessage;
        console.log(decodeMessage);
        switch (decodeMessage.type) {
            case 'LOGOUT': {
                console.log('Client disconnected! id =', id);
                delete activeConnections[id];
                const users = await User.find({online: true}).select('displayName');
                if (users) {
                    Object.keys(activeConnections).forEach(id => {
                        const conn = activeConnections[id];
                        conn.send(JSON.stringify({
                            type: 'ONLINE_USERS',
                            payload: users,
                        }));
                    });
                }
            }
                break;
            case 'SEND_MESSAGE':
                const responseMessage = decodeMessage.payload as UserMessage;

                const message = new Message({
                    user: responseMessage._id,
                    message: responseMessage.message,
                });
                await message.save();
                const result = await Message.findById(message._id).populate({path: 'user', select: 'displayName'});
                Object.keys(activeConnections).forEach(id => {
                    const conn = activeConnections[id];
                    conn.send(JSON.stringify({
                        type: 'SEND_MESSAGES',
                        payload: [result]
                    }));
                });
                break;
        }
    });
    ws.on('close', () => {
        console.log('Client disconnected! id =', id);
        delete activeConnections[id];
    });
});

app.use(router);

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);