import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {isAxiosError} from 'axios';
import {Task, TaskMutation, ValidationError} from '../../types';

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

interface GetTasksProps {
    id: string;
    status?: string;
    milestone?: string;
    assignee?: string;
}

export const getProjectTasks = createAsyncThunk<Task[], GetTasksProps>(
    'issues/getProjectTasks',
    async (data) => {
        try {
            const responseTasks = await axiosApi.get<Task[]>('/tasks?id=' + data.id + '&status=' + data.status + '&milestone=' + data.milestone);
            return responseTasks.data;
        } catch (e) {
            throw  e;
        }
    }
);

export const tryChangeTask = createAsyncThunk<void, GetTasksProps>(
    'issues/onChangeTask',
    async (data) => {
        try {
            if (data.status) {
                await axiosApi.patch('/tasks/' + data.id, {status: data.status});
            } else if (data.assignee) {
                await axiosApi.patch('/tasks/' + data.id, {assignee: data.assignee});
            }
        } catch (e) {
            throw e;
        }
    }
);