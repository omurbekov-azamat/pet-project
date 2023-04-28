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
    developers: string[];
    manager: Manager;
    name: string;
    _id: string;
}