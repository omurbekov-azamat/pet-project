import {createAsyncThunk} from '@reduxjs/toolkit';
import {isAxiosError} from 'axios';
import axiosApi from '../../axiosApi';
import {Milestone, MilestoneSend, ValidationError} from '../../types';

export const createMilestone = createAsyncThunk<void, MilestoneSend, { rejectValue: ValidationError }>(
    'milestone/createMilestone',
    async (data, {rejectWithValue}) => {
        try {
            await axiosApi.post('/milestones', data);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const getProjectMilestones = createAsyncThunk<Milestone[], string>(
    'milestone/getProjectMilestones',
    async (id) => {
        try {
            const responseMilestones = await axiosApi.get<Milestone[]>('/milestones/' + id);
            return responseMilestones.data;
        } catch (e) {
            throw e;
        }
    }
);