import express from 'express';
import mongoose, {ObjectId} from 'mongoose';
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
            }).populate('manager', ['displayName']).populate('developers', '-token');

            if (projects.length <= 0) {
                return res.send({message: "You don't have projects!"});
            }
            return res.send(projects[0]);
        } else {
            const projects = await Project.find({
                manager: user._id,
                _id: req.params.id
            }).populate('manager', ['displayName']).populate('developers', '-token');

            if (projects.length <= 0) {
                return res.send({message: "You don't have projects!"});
            }
            return res.send(projects[0]);
        }
    } catch (e) {
        return next(e);
    }
});

projectsRouter.patch('/:id/toggleDevelopers', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    const projectId = req.params.id;
    const developersId = req.body.useDevelopers;
    const developerId = req.body.deleteDeveloper;
    try {
        const foundProject = await Project.findOne({
            manager: user._id,
            _id: projectId,
        });

        if (!foundProject) {
            return res.send({error: 'Projects are not found!'});
        }

        if (developersId) {
            const newDevelopers = developersId.filter((id: ObjectId) => !foundProject.developers.includes(id));
            if (newDevelopers.length === 0) {
                return res.send({message: 'These developers are already in the project!'});
            }

            foundProject.developers.push(...newDevelopers.map((id: ObjectId) => id));
            await foundProject.save();
            return res.send({message: 'You have added new developers!', newDevelopers});
        } else {
            const developers = foundProject.developers.filter((id: ObjectId) => id.toString() !== developerId);
            foundProject.developers.splice(0, foundProject.developers.length, ...developers);
            await foundProject.save();
            return res.send({message: 'You have removed the developer!', developers});
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