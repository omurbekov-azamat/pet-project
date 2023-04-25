import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {getProject, getProjects} from './projectsThunks';
import {Project} from '../../types';

interface ProjectsState {
    breadcrumbs: string;
    getProjectsLoading: boolean;
    projects: Project[];
    getProjectLoading: boolean;
    project: Project | null;
}

const initialState: ProjectsState = {
    breadcrumbs: 'Projects',
    getProjectsLoading: false,
    projects: [],
    getProjectLoading: false,
    project: null,
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
        builder.addCase(getProject.pending, (state) => {
            state.project = null;
            state.getProjectLoading = true;
        });
        builder.addCase(getProject.fulfilled, (state, {payload: project}) => {
            state.getProjectLoading = false;
            state.project = project;
        });
        builder.addCase(getProject.rejected, (state) => {
            state.getProjectLoading = false;
        });
    }
});

export const projectsReducer = projectsSlice.reducer;

export const {moveBreadcrumbs} = projectsSlice.actions;
export const selectBreadcrumb = (state: RootState) => state.projects.breadcrumbs;
export const selectFetchProjectsLoading = (state: RootState) => state.projects.getProjectsLoading;
export const selectProjects = (state: RootState) => state.projects.projects;
export const selectFetchProjectLoading = (state: RootState) => state.projects.getProjectLoading;
export const selectProject = (state: RootState) => state.projects.project;