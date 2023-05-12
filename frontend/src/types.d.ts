export interface User {
    _id: string;
    email: string;
    displayName: string;
    avatar: string;
    token: string;
    role: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _name: string;
}

export interface GlobalError {
    error: string;
}

export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
    image: File | null;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface Manager {
    displayName: string;
    _id: string;
}

export interface ProjectMutation {
    name: string;
    description: string;
}

export interface Project {
    description: string;
    developers: User[];
    manager: Manager;
    name: string;
    _id: string;
}

export interface Params {
    listName: string;
    managerName: string;
    projectName: string;
    id: string;
    dashboard: string;
}

export interface MilestoneData {
    title: string;
    description?: string;
}

export interface MilestoneMutation extends MilestoneData {
    startDate: Date | null;
    dueDate: Date | null;
}

export interface MilestoneSend extends MilestoneData {
    project: string;
    startDate: string;
    dueDate: string;
}

export interface Milestone extends MilestoneSend {
    _id: string;
}

export interface TaskMutation {
    project: string;
    assignee: string;
    milestone: string;
    title: string;
    description: string;
}

export interface Task {
    assignee: User | null;
    creationDate: string;
    description: string;
    milestone: Milestone;
    project: string;
    status: string;
    title: string;
    _id: string;
}