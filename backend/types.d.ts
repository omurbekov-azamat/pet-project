export interface IUser {
    email: string;
    password: string;
    token: string;
    displayName: string;
    googleId?: string;
    avatar: string | null;
}