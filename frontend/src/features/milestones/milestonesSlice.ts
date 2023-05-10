import {createSlice} from '@reduxjs/toolkit';
import {createMilestone} from './milestonesThunks';
import {RootState} from '../../app/store';
import {ValidationError} from '../../types';

interface MilestonesState {
    createMilestoneLoading: boolean;
    createMilestoneError: ValidationError | null;
}

const initialState: MilestonesState = {
    createMilestoneLoading: false,
    createMilestoneError: null,
};

export const milestonesSlice = createSlice({
    name: 'milestones',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createMilestone.pending, (state) => {
            state.createMilestoneLoading = true;
            state.createMilestoneError = null;
        });
        builder.addCase(createMilestone.fulfilled, (state) => {
            state.createMilestoneLoading = false;
        });
        builder.addCase(createMilestone.rejected, (state, {payload: error}) => {
            state.createMilestoneLoading = false;
            state.createMilestoneError = error || null;
        });
    },
});

export const milestonesReducer = milestonesSlice.reducer;

export const selectCreateMilestoneLoading = (state: RootState) => state.milestones.createMilestoneLoading;
export const selectCreateMilestoneError = (state: RootState) => state.milestones.createMilestoneError;