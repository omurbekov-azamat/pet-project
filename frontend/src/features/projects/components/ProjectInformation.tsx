import React, {useEffect} from 'react';
import {Params} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectFetchProjectLoading, selectProject} from '../projectsSlice';
import {getProject} from '../projectsThunks';
import {Button, Grid, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

interface Props {
    catchParams: Params;
}

const ProjectInformation: React.FC<Props> = ({catchParams}) => {
    const dispatch = useAppDispatch();
    const projectLoading = useAppSelector(selectFetchProjectLoading);
    const project = useAppSelector(selectProject);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProject(catchParams.id));
    }, [dispatch, catchParams.id]);

    const onclickAddDeveloper = () => {
        navigate(`/add_developer/${catchParams.managerName}/${catchParams.projectName}/${catchParams.id}`);
    };

    return (
        <>
            {projectLoading && <Typography>loading...</Typography>}
            <Typography mb={5}>Description: {project?.description}</Typography>
            <Grid container flexDirection='row'>
                <Grid item xs={12}>
                    <Grid container alignItems='center' justifyContent='space-between'>
                        <Grid item>
                            <Typography>Developers: </Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={onclickAddDeveloper} variant='contained'>Add developer</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} flexDirection='column'>
                        {project && project.developers.map(developer => (
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