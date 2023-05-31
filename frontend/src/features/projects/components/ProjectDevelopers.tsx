import React, {useEffect, useState} from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary, Avatar,
    Button,
    Checkbox,
    FormControlLabel, FormGroup,
    Grid,
    Menu,
    Typography
} from '@mui/material';
import {selectAddDevelopersLoading, selectProject} from '../projectsSlice';
import {selectDevelopers, selectUser} from '../../users/usersSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {getProject, toggleDevelopers} from '../projectsThunks';
import {enqueueSnackbar, SnackbarProvider} from 'notistack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {getDevelopers} from '../../users/usersThunks';
import {useParams} from 'react-router-dom';
import {LoadingButton} from '@mui/lab';
import {apiURL} from '../../../constants';
import {Params} from '../../../types';

const ProjectDevelopers = () => {
    const catchParams: Params = useParams() as { listName: string, managerName: string, projectName: string, id: string, dashboard: string };
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const project = useAppSelector(selectProject);
    const developers = useAppSelector(selectDevelopers);
    const loading = useAppSelector(selectAddDevelopersLoading);

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
        if (user && user.role === 'manager' && catchParams.id) {
            dispatch(getDevelopers(catchParams.id));
        }
    }, [dispatch, catchParams.id, user]);

    return (
        <Grid container flexDirection='row' spacing={4}>
            <SnackbarProvider/>
            {user && user.role === 'manager' &&
                <Grid item xs={12}>
                    <Grid container alignItems='stretch' justifyContent='space-between' spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <Button
                                onClick={handleClickOpenChooseDevelopers}
                                sx={{
                                    color: 'grey',
                                    height: '39px',
                                    border: '1px solid lightblue',
                                    textTransform: 'capitalize',
                                    fontSize: '18px',
                                    width: '100%'
                                }}
                            >
                                Choose Developers
                            </Button>
                            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}
                                  onClose={handleCloseChooseDevelopers}>
                                <FormGroup sx={{p: 1, width: 250}}>
                                    {developers && developers.length > 0 ? developers.map((developer) => (
                                        <FormControlLabel
                                            key={developer._id}
                                            control={<Checkbox onChange={handleChangeCheckBox} name={developer._id}/>}
                                            label={developer.displayName}/>
                                    )) : (<Typography>no developers</Typography>)}
                                </FormGroup>
                            </Menu>
                        </Grid>
                        <Grid item>
                            <LoadingButton
                                loading={loading}
                                className='Btn'
                                onClick={handleOnClickAddDeveloper}
                                variant='contained'
                                sx={{
                                    borderRadius: '45px',
                                    backgroundColor: '#ff135a',
                                    '&:hover': {
                                        backgroundColor: '#ff135a',
                                    },
                                }}
                            >
                                Add developers
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            }
            <Grid item xs={12}>
                <Typography variant='h5'>Developers: </Typography>
            </Grid>
            <Grid item xs={12}>
                {project && project.developers.length > 0 ? project.developers.map(developer => (
                    <Accordion key={developer._id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content"
                                          id="panel1a-header">
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item><Avatar alt={developer.displayName}
                                                   src={developer.avatar && apiURL + '/' + developer.avatar}/></Grid>
                                <Grid item><Typography>{developer.displayName}</Typography></Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails sx={{background: 'WhiteSmoke'}}>
                            <Typography>Email: {developer.email}</Typography>
                            <Typography textTransform='capitalize'>Role: {developer.role}</Typography>
                            <Grid item>
                                {user && user.role === 'manager' &&
                                    <LoadingButton onClick={() => deleteDeveloper(developer._id)}>delete</LoadingButton>
                                }
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                )) : <Typography>There is no developers</Typography>}
            </Grid>
        </Grid>
    );
};

export default ProjectDevelopers;
