import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

interface IssuesState {
    createIssueLoading: boolean;
}

const initialState: IssuesState = {
    createIssueLoading: false,
};

export const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers:{},
});

export const issuesReducer = issuesSlice.reducer;

export const selectCreateIssuesLoading = (state: RootState) => state.issues.createIssueLoading;