import {ObjectId} from 'mongoose';

export interface IUser {
    email: string;
    password: string;
    token: string;
    displayName: string;
    googleId?: string;
    avatar: string | null;
}

export interface IProject {
    owner: ObjectId;
    projectName: string;
}

export interface IManager {
    project: ObjectId;
    projectManager: ObjectId;
}

export interface IDeveloper {
    project: ObjectId;
    projectDeveloper: ObjectId;
}