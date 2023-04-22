import mongoose from 'mongoose';
import express from 'express';
import auth from '../middleware/auth';
import Task from '../models/Task';

const tasksRouter = express.Router();

tasksRouter.post('/', auth, async (req, res, next) => {
    try {
        const task = await Task.create({
            name: req.body.name,
            description: req.body.description,
            project: req.body.project,
            developer: req.body.developer,
        });
        return res.send({message: 'Created successfully', task});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

export default tasksRouter;