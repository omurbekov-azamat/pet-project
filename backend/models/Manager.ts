import {model, Schema, Types} from 'mongoose';
import {IManager} from '../types';
import Project from './Project';
import User from './User';

const ManagerSchema = new Schema<IManager>({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Project.findById(value),
            message: 'Project does not exist',
        },
    },
    projectManager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist',
        },
    }
});

const Manager = model<IManager>('Manager', ManagerSchema);

export default Manager;