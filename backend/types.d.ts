import {ObjectId} from 'mongoose';
import {WebSocket} from 'ws';

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
    assignee: ObjectId | undefined;
    milestone: ObjectId;
    status: 'new' | 'in progress' | 'done';
    title: string;
    description: string;
    creationDate: string;
    ticketStartDate: string;
    ticketCloseDate: string;
    spendTime: {
        hours: number;
        minutes: number;
    };
}

export interface IMilestone {
    project: ObjectId;
    title: string;
    startDate: string;
    dueDate: string;
    description: string;
}

export interface SearchParams {
    project?: string;
    status?: string;
    milestone?: string;
}

export interface ActiveConnections {
    [id: string]: WebSocket;
}

export interface UserMessage {
    _id: string;
    message: string;
}

export interface IncomingMessage {
    type: string;
    payload: UserMessage;
}