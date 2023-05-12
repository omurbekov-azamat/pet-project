import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {createTask, getProjectTasks, tryChangeTask} from './issuesThunks';
import {Task, ValidationError} from '../../types';

interface IssuesState {
    createIssueLoading: boolean;
    createIssueError: ValidationError | null;
    fetchIssuesLoading: boolean;
    issuesByStatus: Task[];
    changeIssueLoading: false | string;
}

const initialState: IssuesState = {
    createIssueLoading: false,
    createIssueError: null,
    fetchIssuesLoading: false,
    issuesByStatus: [],
    changeIssueLoading: false,
};

export const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {},
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
        builder.addCase(getProjectTasks.pending, (state) => {
            state.issuesByStatus = [];
            state.fetchIssuesLoading = true;
        });
        builder.addCase(getProjectTasks.fulfilled, (state, {payload: issues}) => {
            state.fetchIssuesLoading = false;
            state.issuesByStatus = issues;
        });
        builder.addCase(getProjectTasks.rejected, (state) => {
            state.fetchIssuesLoading = false;
        });
        builder.addCase(tryChangeTask.pending, (state, {meta}) => {
            state.changeIssueLoading = meta.arg.id;
        });
        builder.addCase(tryChangeTask.fulfilled, (state) => {
            state.changeIssueLoading = false;
        });
        builder.addCase(tryChangeTask.rejected, (state) => {
            state.changeIssueLoading = false;
        });
    },
});

export const issuesReducer = issuesSlice.reducer;

export const selectCreateIssueLoading = (state: RootState) => state.issues.createIssueLoading;
export const selectCreateIssueError = (state: RootState) => state.issues.createIssueError;
export const selectFetchIssuesLoading = (state: RootState) => state.issues.fetchIssuesLoading;
export const selectIssuesByStatus = (state: RootState) => state.issues.issuesByStatus;
export const selectChangeIssueLoading = (state: RootState) => state.issues.changeIssueLoading;