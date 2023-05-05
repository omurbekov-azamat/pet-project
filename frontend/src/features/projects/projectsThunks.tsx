import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {isAxiosError} from 'axios';
import {Project, ProjectMutation, ValidationError} from '../../types';

export const createProject = createAsyncThunk<void, ProjectMutation, { rejectValue: ValidationError }>(
    'projects/createProject',
    async (projectData, {rejectWithValue}) => {
        try {
            await axiosApi.post('/projects', projectData);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const getProjects = createAsyncThunk<Project[]>(
    'projects/fetchProjects',
    async () => {
        try {
            const responseProjects = await axiosApi.get<Project[]>('/projects');
            return responseProjects.data;
        } catch (e) {
            throw e;
        }
    }
);

export const getProject = createAsyncThunk<Project, string>(
    'projects/fetchProject',
    async (id) => {
        try {
            if (id) {
                const responseProject = await axiosApi.get('/projects/' + id);
                return responseProject.data;
            }
        } catch (e) {
            throw e;
        }
    }
);

export interface SendDevelopers {
    id: string;
    useDevelopers: string[];
}

export const addDevelopers = createAsyncThunk<void,SendDevelopers>(
    'projects/addDevelopers',
    async (data) => {
        try {
            await axiosApi.patch('/projects/' + data.id + '/toggleAddDevelopers', {useDevelopers: data.useDevelopers});
        } catch (e) {
            throw e;
        }
    }
);