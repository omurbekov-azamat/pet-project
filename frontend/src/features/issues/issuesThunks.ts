import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {isAxiosError} from 'axios';
import {TaskMutation, ValidationError} from '../../types';

export const createTask = createAsyncThunk<void, TaskMutation, { rejectValue: ValidationError }>(
    'issues/createTask',
    async (data, {rejectWithValue}) => {
        try {
            await axiosApi.post('/tasks', data);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);