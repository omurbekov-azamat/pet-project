import {HydratedDocument, model, Schema, Types} from 'mongoose';
import User from './User';
import Project from './Project';
import Milestone from './Milestone';
import {ITask, IUser} from '../types';

const TaskSchema = new Schema<ITask>({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
        validate: {
            async validator(value: Types.ObjectId) {
                const project = await Project.findById(value);
                return project !== null;
            },
            message: 'Project does not exist',
        },
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async (value: Types.ObjectId) => {
                if (value === null) {
                    return true;
                }
                const user: HydratedDocument<IUser> | null = await User.findById(value);
                return user && user.role === 'developer';
            },
            message: 'User does not exist',
        }
    },
    milestone: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Milestone',
        validate: {
            validator: async (value: Types.ObjectId) => Milestone.findById(value),
            message: 'Milestone does not exist',
        }
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'new',
        enum: ['new', 'in progress', 'done'],
    },
    creationDate: {
        type: String,
        required: true,
        default: new Date().toISOString(),
    },
});

const Task = model<ITask>('Task', TaskSchema);

export default Task;