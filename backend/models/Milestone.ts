import mongoose, {Schema, Types} from 'mongoose';
import {IMilestone} from '../types';
import Project from './Project';

const MilestoneSchema = new Schema<IMilestone>({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Project.findById(value),
            message: 'Project does not exist',
        },
    },
    title: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
        required: true,
    },
});

const Milestone = mongoose.model<IMilestone>('Milestone', MilestoneSchema);

export default Milestone;