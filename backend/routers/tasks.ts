import mongoose from 'mongoose';
import express from 'express';
import auth from '../middleware/auth';
import Task from '../models/Task';
import {ITask, SearchParams} from '../types';
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

tasksRouter.get('/', auth, async (req, res, next) => {
    const project = req.query.id as string;
    const status = req.query.status as string;
    try {
        const findParams: SearchParams = {};

        if (project) {
            findParams.project = project;
        }

        if (status !== 'undefined') {
            findParams.status = status;
        }

        const tasks = await Task.find(findParams).populate('assignee', '-token').populate('milestone');
        return res.send(tasks);
    } catch (e) {
        return next(e);
    }
});

export default tasksRouter;