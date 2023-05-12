import mongoose from 'mongoose';
import express from 'express';
import auth from '../middleware/auth';
import Task from '../models/Task';
import {ITask} from '../types';
import permit from '../middleware/permit';

const tasksRouter = express.Router();

tasksRouter.post('/', auth, permit('manager'), async (req, res, next) => {
    try {
        const task: ITask = await Task.create({
            project: req.body.project,
            assignee: req.body.assignee ? req.body.assignee : null,
            milestone: req.body.milestone,
            title: req.body.title,
            description: req.body.description,
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

tasksRouter.get('/:id', auth, async (req, res, next) => {
    const project = req.params.id;
    const status = req.body.status;
    try {
        const tasks = Task.find({project, status});
        return res.send(tasks);
    } catch (e) {
        return next(e);
    }
});

export default tasksRouter;