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