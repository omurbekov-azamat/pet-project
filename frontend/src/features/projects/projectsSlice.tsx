import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

interface ProjectsState {
    breadcrumbs: string;
}

const initialState: ProjectsState = {
    breadcrumbs: 'Projects'
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        moveBreadcrumbs: (state, {payload: string}: PayloadAction<string>) => {
            state.breadcrumbs = string;
        },
    },
});

export const projectsReducer = projectsSlice.reducer;

export const {moveBreadcrumbs} = projectsSlice.actions;
export const selectBreadcrumb = (state: RootState) => state.projects.breadcrumbs;