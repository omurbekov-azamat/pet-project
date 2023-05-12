import mongoose, {HydratedDocument} from 'mongoose';
import express from 'express';
import auth from '../middleware/auth';
import Task from '../models/Task';
import {ITask, SearchParams} from '../types';
import permit from '../middleware/permit';
import milestone from '../models/Milestone';

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
    const milestone = req.query.milestone as string;
    try {
        const findParams: SearchParams = {};

        if (project) {
            findParams.project = project;
        }

        if (status !== 'undefined') {
            findParams.status = status;
        }

        if (milestone !== 'undefined') {
            findParams.milestone = milestone;
            findParams.status = 'done';
        }

        const tasks = await Task.find(findParams).populate('assignee', '-token').populate('milestone');
        return res.send(tasks);
    } catch (e) {
        return next(e);
    }
});

tasksRouter.patch('/:id', auth, async (req, res, next) => {
    try {
        const updatedFields = {...req.body};
        const task: HydratedDocument<ITask> | null = await Task.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updatedFields},
            {new: true},
        );
        if (!task) {
            return res.status(404).send({message: 'Not found task'});
        }
        res.send({message: 'Changed successfully'});
    } catch (e) {
        return next(e);
    }
});

export default tasksRouter;