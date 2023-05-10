import {createAsyncThunk} from '@reduxjs/toolkit';
import {isAxiosError} from 'axios';
import {MilestoneSend, ValidationError} from '../../types';
import axiosApi from '../../axiosApi';

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