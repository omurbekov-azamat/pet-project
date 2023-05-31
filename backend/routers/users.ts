import express from 'express';
import {promises as fs} from "fs";
import {Error} from "mongoose";
import {imagesUpload} from '../multer';
import crypto from "crypto";
import User from '../models/User';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import Project from '../models/Project';

const usersRouter = express.Router();

usersRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            role: req.body.role,
            avatar: req.file ? req.file.filename : null,
            token: crypto.randomUUID(),
        });
        return res.send({message: 'Registered successfully!', user});
    } catch (error) {
        if (req.file) {
            await fs.unlink(req.file.path);
        }
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(400).send({error: 'User is not found!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Password is wrong'});
    }

    try {
        user.online = true;
        user.generateToken();
        await user.save();
        return res.send({message: 'Username and password correct', user});
    } catch (error) {
        return next(error);
    }
});

usersRouter.get('/:id/developers', auth, permit('manager'), async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const foundProject = await Project.findById(projectId);
        if (!foundProject) {
            return res.send({message: 'Project is not found'});
        }

        const developers = await User.find({role: 'developer'}).select('-token');

        if (developers.length === 0) {
            return res.send({message: 'There are no developers'});
        }

        const notInProject = await User.find({
            role: 'developer',
            _id: {$nin: foundProject.developers}
        }).select('-token');
        return res.send(notInProject);
    } catch (e) {
        return next(e);
    }
});

usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const success = { message: 'Success' };

        if (!token) {
            return res.send(success);
        }

        const user = await User.findOneAndUpdate({token}, {online: false}, {new: true});

        if (!user) {
            return res.send(success);
        }

        user.generateToken();
        await user.save();
        return res.send(success);
    } catch (e) {
        return next(e);
    }
});

export default usersRouter;