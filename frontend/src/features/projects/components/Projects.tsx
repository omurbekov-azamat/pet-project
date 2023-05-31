import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {moveBreadcrumbs, selectFetchProjectsLoading, selectProjects} from '../projectsSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../users/usersSlice';
import {Badge, Button, Grid, Typography} from '@mui/material';
import ProjectItem from './ProjectItem';
import Divider from '@mui/material/Divider';
import {getProjects} from '../projectsThunks';
import Spinner from '../../../components/UI/Spinner/Spinner';

const Projects = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const projects = useAppSelector(selectProjects);
    const user = useAppSelector(selectUser);
    const projectsLoading = useAppSelector(selectFetchProjectsLoading);

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

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
                        <Button
                            className='Btn'
                            onClick={onClickHandler}
                            variant='contained'
                            sx={{
                                borderRadius: '45px',
                                backgroundColor: 'rgb(151, 95, 255)',
                                '&:hover': {
                                    backgroundColor: 'rgb(151, 95, 255)',
                                },
                            }}
                        >
                            new project
                        </Button>}
                </Grid>
            </Grid>
            <Typography>
                <Badge badgeContent={projects.length} color="error" sx={{mt: 3}}>
                    Yours
                </Badge>
            </Typography>
            <Divider sx={{mt: 0.5}}/>
            {projectsLoading && <Spinner/>}
            {projects.length > 0 &&
                <Grid container flexDirection='column' mt={2}>
                    {projects.map(project => (
                        <ProjectItem key={project._id} item={project}/>
                    ))}
                </Grid>
            }
        </>
    );
};

export default Projects;