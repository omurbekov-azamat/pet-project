import {model, Schema, Types} from 'mongoose';
import User from './User';
import {IProject} from '../types';

const ProjectSchema = new Schema<IProject>({
    name: {
        type: String,
        required: true,
    },
    description: String,
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist',
        },
    },
    developers: {
        type: [{type: Schema.Types.ObjectId, ref: 'User'}],
    },
});

const Project = model<IProject>('Project', ProjectSchema);

export default Project;