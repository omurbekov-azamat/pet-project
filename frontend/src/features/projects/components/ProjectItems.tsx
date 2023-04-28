import React from 'react';
import {useNavigate} from 'react-router-dom';
import {moveBreadcrumbs, selectProjects} from '../projectsSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../users/usersSlice';
import {Badge, Button, Grid, Typography} from '@mui/material';
import ProjectItem from './ProjectItem';
import Divider from '@mui/material/Divider';

const ProjectItems = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const projects = useAppSelector(selectProjects);
    const user = useAppSelector(selectUser);

    const onClickHandler = () => {
        dispatch(moveBreadcrumbs('New project'));
        navigate('/dashboard/new-project');
    };

    return (
        <>
            <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item>
                    <Typography component='div' variant='h5' fontWeight='bolder'>Projects</Typography>
                </Grid>
                <Grid item>
                    {user && user.role === 'manager' &&
                        <Button variant='contained' onClick={onClickHandler}>new project</Button>}
                </Grid>
            </Grid>
            <Typography>
                <Badge badgeContent={projects.length} color="error" sx={{mt: 3}}>
                    Yours
                </Badge>
            </Typography>
            <Divider sx={{mt: 0.5}}/>
            <Grid container flexDirection='column' mt={2}>
                {projects.map(project => (
                    <ProjectItem key={project._id} item={project}/>
                ))}
            </Grid>
        </>
    )
        ;
};

export default ProjectItems;