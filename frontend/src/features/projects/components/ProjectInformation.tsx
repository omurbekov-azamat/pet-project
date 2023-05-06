import React, {useEffect} from 'react';
import {Params} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectFetchProjectLoading, selectProject} from '../projectsSlice';
import {getProject, toggleDevelopers} from '../projectsThunks';
import {Button, Grid, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {LoadingButton} from '@mui/lab';

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

    const deleteDeveloper = async (id: string) => {
        await dispatch(toggleDevelopers({id: catchParams.id, deleteDeveloper: id}));
        await dispatch(getProject(catchParams.id));
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
                    <Grid container spacing={2} flexDirection='column' mt={3}>
                        {project && project.developers.map(developer => (
                            <Grid item key={developer._id}>
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <Typography>{developer.displayName} {developer.email}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <LoadingButton onClick={() => deleteDeveloper(developer._id)}>delete</LoadingButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ProjectInformation;