import React, {useEffect} from 'react';
import {selectFetchProjectLoading, selectProject} from '../projectsSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {getProject} from '../projectsThunks';
import {Avatar, Box, Grid, LinearProgress, Typography} from '@mui/material';
import ProjectReadMe from './ProjectReadMe';
import {Params} from '../../../types';

interface Props {
    catchParams: Params;
}

const Project: React.FC<Props> = ({catchParams}) => {
    const dispatch = useAppDispatch();
    const projectLoading = useAppSelector(selectFetchProjectLoading);
    const project = useAppSelector(selectProject);

    useEffect(() => {
        dispatch(getProject(catchParams.id));
    }, [dispatch, catchParams.id]);

    return (
        <>
            {projectLoading && <Typography>loading...</Typography>}
            {project && <Box>
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
            </Box>}
        </>
    );
};

export default Project;