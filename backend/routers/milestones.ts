import express from 'express';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import mongoose from 'mongoose';
import Milestone from '../models/Milestone';

const milestonesRouter = express.Router();

milestonesRouter.post('/', auth, permit('manager'), async (req, res, next) => {
   try {
       const milestone = new Milestone({
           project: req.body.project,
           title: req.body.title,
           startDate: req.body.startDate,
           dueDate: req.body.dueDate,
           description: req.body.description,
       });
       await milestone.save();
       return res.send({message: 'Created successfully'});
   } catch (e) {
       if (e instanceof mongoose.Error.ValidationError) {
           return res.status(400).send(e);
       }
       return next(e);
   }
});

export default milestonesRouter;