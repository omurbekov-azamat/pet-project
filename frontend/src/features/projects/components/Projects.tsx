import React, {useEffect} from 'react';
import {selectFetchProjectsLoading, selectProjects} from '../projectsSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {getProjects} from '../projectsThunks';
import {Box, Typography} from '@mui/material';
import ProjectItems from './ProjectItems';

export interface Props {
    dashboard: string;
    managerName: string;
    projectName: string;
}

const Projects: React.FC<Props> = ({dashboard, projectName, managerName}) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectFetchProjectsLoading);
    const projects = useAppSelector(selectProjects);

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch, dashboard]);

    let showProject = projects.length > 0 && <ProjectItems/>

    if (projectName && managerName) {
        showProject = <Box>Test</Box>
    }

    return (
        <>
            {loading && <Typography>loading...</Typography>}
            {showProject}
        </>
    );
};

export default Projects;