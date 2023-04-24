import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {getProjects} from './projectsThunks';
import {Project} from '../../types';

interface ProjectsState {
    breadcrumbs: string;
    getProjectsLoading: boolean;
    projects: Project[];
}

const initialState: ProjectsState = {
    breadcrumbs: 'Projects',
    getProjectsLoading: false,
    projects: [],
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        moveBreadcrumbs: (state, {payload: string}: PayloadAction<string>) => {
            state.breadcrumbs = string;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProjects.pending, (state) => {
            state.projects = [];
            state.getProjectsLoading = true;
        });
        builder.addCase(getProjects.fulfilled, (state, {payload: projects}) => {
            state.getProjectsLoading = false;
            state.projects = projects;
        });
        builder.addCase(getProjects.rejected, (state) => {
            state.getProjectsLoading = false;
        });
    }
});

export const projectsReducer = projectsSlice.reducer;

export const {moveBreadcrumbs} = projectsSlice.actions;
export const selectBreadcrumb = (state: RootState) => state.projects.breadcrumbs;
export const selectFetchProjectsLoading = (state: RootState) => state.projects.getProjectsLoading;
export const selectProjects = (state: RootState) => state.projects.projects;