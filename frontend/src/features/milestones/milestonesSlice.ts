import {createSlice} from '@reduxjs/toolkit';
import {createMilestone, getProjectMilestones} from './milestonesThunks';
import {RootState} from '../../app/store';
import {Milestone, ValidationError} from '../../types';

interface MilestonesState {
    createMilestoneLoading: boolean;
    createMilestoneError: ValidationError | null;
    fetchMilestonesLoading: boolean;
    milestones: Milestone[];
}

const initialState: MilestonesState = {
    createMilestoneLoading: false,
    createMilestoneError: null,
    fetchMilestonesLoading: false,
    milestones: [],
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
        builder.addCase(getProjectMilestones.pending, (state) => {
            state.milestones = [];
            state.fetchMilestonesLoading = true;
        });
        builder.addCase(getProjectMilestones.fulfilled, (state, {payload: milestones}) => {
            state.fetchMilestonesLoading = false;
            state.milestones = milestones;
        });
        builder.addCase(getProjectMilestones.rejected, (state) => {
            state.fetchMilestonesLoading = false;
        });
    },
});

export const milestonesReducer = milestonesSlice.reducer;

export const selectCreateMilestoneLoading = (state: RootState) => state.milestones.createMilestoneLoading;
export const selectCreateMilestoneError = (state: RootState) => state.milestones.createMilestoneError;
export const selectFetchMilestonesLoading = (state: RootState) => state.milestones.fetchMilestonesLoading;
export const selectMilestones = (state: RootState) => state.milestones.milestones;