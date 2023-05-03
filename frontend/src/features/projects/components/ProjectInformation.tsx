import React, {useEffect} from 'react';
import {Params} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectFetchProjectLoading, selectProject} from '../projectsSlice';
import {getProject} from '../projectsThunks';
import {Grid, Typography} from '@mui/material';

interface Props {
    catchParams: Params;
}

const ProjectInformation: React.FC<Props> = ({catchParams}) => {
    const dispatch = useAppDispatch();
    const projectLoading = useAppSelector(selectFetchProjectLoading);
    const project = useAppSelector(selectProject);

    useEffect(() => {
        dispatch(getProject(catchParams.id));
    }, [dispatch, catchParams.id]);

    return (
        <>
            {projectLoading && <Typography>loading...</Typography>}
            <Typography>Description: {project?.description}</Typography>
            <Grid container flexDirection='row'>
                <Grid item xs={12}>
                    <Typography>Developers: </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} flexDirection='column'>
                        {project?.developers.map(developer => (
                            <Grid item key={developer._id}>
                                <Typography>{developer.displayName} {developer.email}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ProjectInformation;