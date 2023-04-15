import {model, Schema, Types} from 'mongoose';
import User from './User';
import Project from './Project';
import {IDeveloper} from '../types';

const DeveloperSchema = new Schema<IDeveloper>({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Project.findById(value),
            message: 'Project does not exist',
        },
    },
    projectDeveloper: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist',
        },
    }
});

const Developer = model<IDeveloper>('Developer', DeveloperSchema);

export default Developer;
