import React, {useEffect} from 'react';
import {selectFetchProjectsLoading, selectProjects} from '../projectsSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {getProject, getProjects} from '../projectsThunks';
import {Box, Typography} from '@mui/material';
import ProjectItems from './ProjectItems';

export interface Props {
    dashboard: string;
    managerName: string;
    projectName: string;
    projectId: string;
}

const Projects: React.FC<Props> = ({dashboard, projectName, managerName, projectId}) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectFetchProjectsLoading);
    const projects = useAppSelector(selectProjects);

    useEffect(() => {
        if (!projectId) {
            dispatch(getProjects());
        }
    }, [dispatch, dashboard, projectId]);

    useEffect(() => {
        dispatch(getProject(projectId));
    }, [dispatch, projectId]);

    let showProject = projects.length > 0 && <ProjectItems/>

    if (projectName && managerName) {
        showProject = <Box>test</Box>
    }

    return (
        <>
            {loading && <Typography>loading...</Typography>}
            {showProject}
        </>
    );
};

export default Projects;