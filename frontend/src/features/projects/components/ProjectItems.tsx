import React from 'react';
import {useAppSelector} from '../../../app/hooks';
import {selectProjects} from '../projectsSlice';
import ProjectItem from './ProjectItem';
import {Grid} from '@mui/material';

const ProjectItems = () => {
    const projects = useAppSelector(selectProjects);
    return (
        <Grid container flexDirection='column' mt={2}>
            {projects.map(project => (
                <ProjectItem key={project._id} item={project}/>
            ))}
        </Grid>
    );
};

export default ProjectItems;