import React, {useEffect} from 'react';
import {selectFetchProjectLoading, selectFetchProjectsLoading, selectProject, selectProjects} from '../projectsSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {getProject, getProjects} from '../projectsThunks';
import {Avatar, Box, Grid, LinearProgress, Typography} from '@mui/material';
import ProjectItems from './ProjectItems';
import ProjectReadMe from './ProjectReadMe';

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
        showProject = <Box>
            <Grid container alignItems='center' mb={1}>
                <Grid item>
                    <Avatar
                        sx={{background: 'lightBlue', borderRadius: '5px', mr: 2}}
                    >
                        {project?.name[0]}
                    </Avatar>
                </Grid>
                <Grid item>
                    <Grid container flexDirection='column'>
                        <Grid item>
                            <Typography fontWeight='bolder'>{project?.name}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='subtitle2'>Project ID: {project?._id}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <LinearProgress color="error"/>
            {project && <ProjectReadMe project={project}/>}
        </Box>
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