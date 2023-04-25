import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Project} from '../../types';

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