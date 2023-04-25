import React, {useEffect} from 'react';
import {selectFetchProjectLoading, selectFetchProjectsLoading, selectProject, selectProjects} from '../projectsSlice';
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
    const projectsLoading = useAppSelector(selectFetchProjectsLoading);
    const projectLoading = useAppSelector(selectFetchProjectLoading);
    const projects = useAppSelector(selectProjects);
    const project = useAppSelector(selectProject);

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
        showProject = <Box>{project?.description}</Box>
    }

    return (
        <>
            {projectsLoading && <Typography>loading...</Typography>}
            {projectLoading && <Typography>loading...</Typography>}
            {showProject}
        </>
    );
};

export default Projects;