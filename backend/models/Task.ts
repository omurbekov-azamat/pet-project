import {model, Schema, Types} from 'mongoose';
import User from './User';
import Project from './Project';
import {ITask} from '../types';

const TaskSchema = new Schema<ITask>({
    name: {
        type: String,
        required: true,
    },
    description: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Project.findById(value),
            message: 'Project does not exist',
        },
    },
    developer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist',
        }
    },
    status: {
        type: String,
        enum: ['new', 'in progress', 'done'],
        default: 'new',
    },
});

const Task = model<ITask>('Task', TaskSchema);

export default Task;