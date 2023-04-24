import React from 'react';
import {useAppSelector} from '../../../app/hooks';
import {selectProjects} from '../projectsSlice';
import ProjectItem from './ProjectItem';
import {Badge, Grid, Typography} from '@mui/material';
import Divider from '@mui/material/Divider';

const ProjectItems = () => {
    const projects = useAppSelector(selectProjects);
    return (
        <>
            <Typography component='div' variant='h5' fontWeight='bolder'>Projects</Typography>
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
    );
};

export default ProjectItems;