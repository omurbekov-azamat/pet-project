import express from 'express';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import Project from '../models/Project';
import Manager from '../models/Manager';
import Developer from '../models/Developer';

const projectsRouter = express.Router();

projectsRouter.post('/', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        const project = await Project.create({
            owner: user._id,
            projectName: req.body.projectName,
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
        const projects = await Project.find({owner: user._id});
        const managers = await Manager.find({projectManager: user._id}).populate('project');
        const developers = await Developer.find({projectDeveloper: user._id}).populate('project');

        const projectsData = {
            projects,
            managers,
            developers,
        }
        return res.send(projectsData);
    } catch (e) {
        return next(e);
    }
});

projectsRouter.delete('/:id', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    const project = await Project.findById(req.params.id);
    if (!project) {
        return res.status(404).send({error: 'Project is not found'});
    }
    try {
        if (project.owner.toString() === user._id.toString()) {
            await Project.deleteOne(project._id);
            return res.send({message: 'Delete was successfully'});
        } else {
            return res.send({message: 'Sorry you can not delete project, Its not yours!'});
        }
    } catch (e) {
        return next(e);
    }
});

export default projectsRouter;