import React, {useEffect, useState} from 'react';
import {selectAddDevelopersLoading, selectFetchProjectLoading, selectProject} from '../projectsSlice';
import {getProject, toggleDevelopers} from '../projectsThunks';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectDevelopers, selectUser} from '../../users/usersSlice';
import {getDevelopers} from '../../users/usersThunks';
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, Menu, Typography} from '@mui/material';
import {enqueueSnackbar, SnackbarProvider} from 'notistack';
import {LoadingButton} from '@mui/lab';
import {Params} from '../../../types';

interface Props {
    catchParams: Params;
}

const ProjectInformation: React.FC<Props> = ({catchParams}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const projectLoading = useAppSelector(selectFetchProjectLoading);
    const loading = useAppSelector(selectAddDevelopersLoading);
    const project = useAppSelector(selectProject);
    const developers = useAppSelector(selectDevelopers);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [chooseDevelopers, setChooseDevelopers] = useState<string[]>([]);

    const handleClickOpenChooseDevelopers = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseChooseDevelopers = () => {
        setAnchorEl(null);
    };

    const handleChangeCheckBox = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        if (checked) {
            const result = await developers.find(item => item._id === name);
            if (result) {
                setChooseDevelopers(prev => [...prev, result._id]);
            }
        } else {
            setChooseDevelopers(prev => prev.filter(item => item !== name));
        }
    };

    const deleteDeveloper = async (id: string) => {
        await dispatch(toggleDevelopers({id: catchParams.id, deleteDeveloper: id}));
        await dispatch(getProject(catchParams.id));
        await dispatch(getDevelopers(catchParams.id));
    };

    const handleOnClickAddDeveloper = async () => {
        if (chooseDevelopers.length > 0) {
            await dispatch(toggleDevelopers({id: catchParams.id, useDevelopers: chooseDevelopers}))
            await enqueueSnackbar('You have successfully added developers to the project', {variant: 'success'});
            dispatch(getDevelopers(catchParams.id));
            dispatch(getProject(catchParams.id));
            setChooseDevelopers([]);
        } else {
            await enqueueSnackbar('You have to choose developer', {variant: 'warning'});
        }
    };

    useEffect(() => {
        dispatch(getProject(catchParams.id));
    }, [dispatch, catchParams.id]);

    useEffect(() => {
        if (user?.role === 'manager') {
            dispatch(getDevelopers(catchParams.id));
        }
    }, [dispatch, catchParams.id, user]);

    return (
        <>
            {projectLoading && <Typography>loading...</Typography>}
            <Typography mb={5}>Description: {project?.description}</Typography>
            <Grid container flexDirection='row' spacing={4}>
                {user && user.role === 'manager' &&
                    <Grid item xs={12}>
                        <SnackbarProvider/>
                        <Button
                            onClick={handleClickOpenChooseDevelopers}
                            sx={{
                                color: 'grey',
                                height: '56px',
                                border: '1px solid lightgrey',
                                textTransform: 'capitalize',
                                fontSize: '18px',
                            }}
                        >
                            Choose Developers
                        </Button>
                        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}
                              onClose={handleCloseChooseDevelopers}>
                            <FormGroup sx={{p: 1, width: 189}}>
                                {developers && developers.length > 0 ? developers.map((developer) => (
                                    <FormControlLabel
                                        key={developer._id}
                                        control={<Checkbox onChange={handleChangeCheckBox} name={developer._id}/>}
                                        label={developer.displayName}
                                    />
                                )) : (<Typography>no developers</Typography>)}
                            </FormGroup>
                        </Menu>
                        <LoadingButton
                            loading={loading}
                            onClick={handleOnClickAddDeveloper}
                            variant='contained'
                        >
                            Add developers
                        </LoadingButton>
                    </Grid>
                }
                <Grid item xs={12}>
                    <Typography>Developers: </Typography>
                </Grid>
                <Grid item xs={12}>
                    {project && project.developers.length > 0 ? project.developers.map(developer => (
                        <Grid container spacing={1} flexDirection='row' alignItems='center' key={developer._id}>
                            <Grid item>
                                <Typography>{developer.displayName} {developer.email}</Typography>
                            </Grid>
                            <Grid item>
                                {user && user.role === 'manager' &&
                                    <LoadingButton onClick={() => deleteDeveloper(developer._id)}>delete</LoadingButton>
                                }
                            </Grid>
                        </Grid>
                    )) : <Typography>There is no developers</Typography>}
                </Grid>
            </Grid>
        </>
    );
};

export default ProjectInformation;