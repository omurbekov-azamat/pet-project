import {ObjectId} from 'mongoose';

export interface IUser {
    email: string;
    password: string;
    token: string;
    displayName: string;
    googleId?: string;
    avatar: string | null;
    role: string;
}

export interface IProject {
    name: string;
    description: string;
    manager: ObjectId;
    developers: ObjectId[];
}

export interface ITask {
    project: ObjectId;
    assignee: ObjectId;
    milestone: ObjectId;
    status: 'new' | 'in progress' | 'done';
    title: string;
    description: string;
    creationDate: string;
}

export interface IMilestone {
    project: ObjectId;
    title: string;
    startDate: string;
    dueDate: string;
    description: string;
}