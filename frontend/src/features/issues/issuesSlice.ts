import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {createTask} from './issuesThunks';
import {ValidationError} from '../../types';

interface IssuesState {
    createIssueLoading: boolean;
    createIssueError: ValidationError | null;
}

const initialState: IssuesState = {
    createIssueLoading: false,
    createIssueError: null,
};

export const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(createTask.pending, (state) => {
            state.createIssueLoading = true;
            state.createIssueError = null;
        });
        builder.addCase(createTask.fulfilled, (state) => {
            state.createIssueLoading = false;
        });
        builder.addCase(createTask.rejected, (state, {payload: error}) => {
            state.createIssueLoading = false;
            state.createIssueError = error || null;
        });
    }
});

export const issuesReducer = issuesSlice.reducer;

export const selectCreateIssueLoading = (state: RootState) => state.issues.createIssueLoading;
export const selectCreateIssueError = (state: RootState) => state.issues.createIssueError;