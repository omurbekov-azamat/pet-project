import express from "express";
import expressWs from 'express-ws';
import cors from 'cors';
import mongoose from "mongoose";
import config from "./config";
import usersRouter from './routers/users';
import projectsRouter from './routers/projects';
import tasksRouter from './routers/tasks';
import milestonesRouter from './routers/milestones';
import {ActiveConnections} from './types';

const app = express();
expressWs(app);
const port = 8000;
const router = express.Router();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
app.use('/milestones', milestonesRouter);
app.use(router);

const activeConnections: ActiveConnections = {};

router.ws('/chat', (ws) => {
    const id = crypto.randomUUID();
    activeConnections[id] = ws;
    console.log('Client connected! id =', id);
});

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