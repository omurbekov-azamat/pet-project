import React, {useEffect} from 'react';
import {selectFetchProjectsLoading, selectProjects} from '../projectsSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {getProjects} from '../projectsThunks';
import {Badge, Typography} from '@mui/material';
import Divider from '@mui/material/Divider';
import ProjectItems from './ProjectItems';

export interface Props {
    dashboard: string | undefined;
}

const Projects: React.FC<Props> = ({dashboard}) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectFetchProjectsLoading);
    const projects = useAppSelector(selectProjects);

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch, dashboard]);

    return (
        <>
            <Typography component='div' variant='h5' fontWeight='bolder'>Projects</Typography>
            {loading && <Typography>loading...</Typography>}
            {projects.length > 0 &&
                <>
                    <Typography>
                        <Badge badgeContent={projects.length} color="error" sx={{mt: 3}}>
                            Yours
                        </Badge>
                    </Typography>
                    <Divider sx={{mt: 0.5}}/>
                </>
            }
            <ProjectItems/>
        </>
    );
};

export default Projects;