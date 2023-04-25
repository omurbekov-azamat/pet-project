import express from 'express';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import Project from '../models/Project';
import Task from '../models/Task';

const projectsRouter = express.Router();

projectsRouter.post('/', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        const project = await Project.create({
            name: req.body.name,
            description: req.body.description,
            manager: user._id,
            developers: req.body.developers,
        });
        return res.send({message: 'Created successfully', project});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

projectsRouter.get('/', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        if (user.role === 'developer') {
            const projects = await Project.find({
                developers: {$in: [user._id]}
            }).populate('manager', ['displayName']);

            if (projects.length <= 0) {
                return res.send({message: "You don't have projects!"});
            }
            return res.send(projects);
        } else {
            const projects = await Project.find({manager: user._id}).populate('manager', ['displayName']);

            if (projects.length <= 0) {
                return res.send({message: "You don't have projects!"});
            }
            return res.send(projects);
        }
    } catch (e) {
        return next(e);
    }
});

projectsRouter.get('/:id', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        if (user.role === 'developer') {
            const projects = await Project.find({
                _id: req.params.id,
                developers: {$in: [user._id]}
            }).populate('manager', ['displayName']);

            if (projects.length <= 0) {
                return res.send({message: "You don't have projects!"});
            }
            return res.send(projects);
        } else {
            const projects = await Project.find({
                manager: user._id,
                _id: req.params.id
            }).populate('manager', ['displayName']);

            if (projects.length <= 0) {
                return res.send({message: "You don't have projects!"});
            }
            return res.send(projects[0]);
        }
    } catch (e) {
        return next(e);
    }
});

projectsRouter.patch('/:id/toggleAddDevelopers', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    const projectId = req.params.id;
    try {
        const foundProject = await Project.findOne({
            manager: user._id,
            _id: projectId,
        });

        if (!foundProject) {
            return res.send({error: 'Projects are not found!'});
        }

        if (foundProject.developers.includes(req.body.developerId)) {
            return res.send({message: 'This developer is already in the project!'});
        } else {
            foundProject.developers.push(req.body.developerId);
            foundProject.save();
            return res.send({message: 'You have added a new developer!'});
        }
    } catch (e) {
        return next(e);
    }
});

projectsRouter.delete('/:id', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        const foundProject = await Project.findOne({
            manager: user._id,
            _id: req.params.id,
        });

        if (!foundProject) {
            return res.send({error: 'Projects are not found!'});
        }

        await Task.deleteMany({project: foundProject._id});
        await Project.deleteOne(foundProject._id);
        return res.send({message: 'Project has been successfully deleted!'});
    } catch (e) {
        next(e);
    }
});

export default projectsRouter;