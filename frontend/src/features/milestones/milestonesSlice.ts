import {createSlice} from '@reduxjs/toolkit';

interface MilestonesState {
    createMilestone: boolean;
}

const initialState: MilestonesState = {
    createMilestone: false,
};

export const milestonesSlice = createSlice({
    name: 'milestones',
    initialState,
    reducers:{},
});

export const milestonesReducer = milestonesSlice.reducer;