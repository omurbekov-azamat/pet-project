import React, {useEffect} from 'react';
import TabPanel from '@mui/lab/TabPanel';
import {getProjectMilestones} from '../../milestones/milestonesThunks';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectMilestones} from '../../milestones/milestonesSlice';
import {Box, Grid, Tab, TextField, Typography} from '@mui/material';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {selectProject} from '../../projects/projectsSlice';
import {getProject} from '../../projects/projectsThunks';
import {LoadingButton, TabContext, TabList} from '@mui/lab';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {selectUser} from '../../users/usersSlice';
import MenuItem from '@mui/material/MenuItem';
import {createTask, getProjectTasks} from '../issuesThunks';
import {selectCreateIssueError, selectCreateIssueLoading, selectIssuesByStatus} from '../issuesSlice';
import {Params, TaskMutation} from '../../../types';
import IssueItems from './IssueItems';

const initialState: TaskMutation = {
    assignee: '',
    description: '',
    milestone: '',
    project: '',
    title: '',
};

interface Props {
    catchParams: Params;
    exist?: TaskMutation;
}

const IssuesPage: React.FC<Props> = ({catchParams, exist = initialState}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const project = useAppSelector(selectProject);
    const milestones = useAppSelector(selectMilestones);
    const createLoading = useAppSelector(selectCreateIssueLoading);
    const createError = useAppSelector(selectCreateIssueError);
    const issuesByStatus = useAppSelector(selectIssuesByStatus);

    const [option, setOption] = React.useState(`1`);
    const [state, setState] = React.useState<TaskMutation>(exist);

    const optionHandleChange = (event: React.SyntheticEvent, newValue: string) => {
        setOption(newValue);
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const handleInputChange = (event: SelectChangeEvent) => {
        const {name, value} = event.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(createTask({...state, project: catchParams.id}));
        await setState(exist);
        await setOption('1');
    };

    const getFieldError = (fieldName: string) => {
        try {
            return createError?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    useEffect(() => {
        if (option === '1') {
            dispatch(getProjectTasks({id: catchParams.id, status: 'new'}));
        } else if (option === '2') {
            dispatch(getProjectTasks({id: catchParams.id, status: 'in progress'}));
        } else if (option === '3') {
            dispatch(getProjectTasks({id: catchParams.id, status: 'done'}));
        } else if (option === '4') {
            dispatch(getProjectTasks({id: catchParams.id}));
        } else if (option === '5') {
            dispatch(getProjectMilestones(catchParams.id))
            dispatch(getProject(catchParams.id));
        }
    }, [dispatch, catchParams.id, option]);

    return (
        <Box sx={{width: '100%'}}>
            <TabContext value={option}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={optionHandleChange} aria-label="lab API tabs example">
                        <Tab label="Open" value="1"/>
                        <Tab label="In Progress" value="2"/>
                        <Tab label="Closed" value="3"/>
                        <Tab label='All' value='4'/>
                        {user && user.role === 'manager' && <Tab label="New issue" value="5"/>}
                    </TabList>
                </Box>
                <TabPanel value='1'>{issuesByStatus && <IssueItems items={issuesByStatus}/>}</TabPanel>
                <TabPanel value='2'>{issuesByStatus && <IssueItems items={issuesByStatus}/>}</TabPanel>
                <TabPanel value='3'>{issuesByStatus && <IssueItems items={issuesByStatus}/>}</TabPanel>
                <TabPanel value='4'>{issuesByStatus && <IssueItems items={issuesByStatus}/>}</TabPanel>
                <TabPanel value='5'>
                    <Box component='form' onSubmit={submitFormHandler}>
                        <Typography fontWeight='bolder'>New Issue</Typography>
                        <Grid container flexDirection='column' spacing={3} mt={1}>
                            <Grid item xs={12}>
                                <TextField
                                    name='title'
                                    value={state.title}
                                    onChange={inputChangeHandler}
                                    label='Title (required)'
                                    fullWidth={true}
                                    error={Boolean(getFieldError('title'))}
                                    helperText={getFieldError('title')}
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    name='description'
                                    value={state.description}
                                    onChange={inputChangeHandler}
                                    rows={4}
                                    multiline
                                    label='Description'
                                    fullWidth={true}
                                    error={Boolean(getFieldError('description'))}
                                    helperText={getFieldError('description')}
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={state.assignee}
                                        label='Assignee'
                                        name='assignee'
                                        onChange={handleInputChange}
                                        sx={{minWidth: 200}}
                                        error={Boolean(getFieldError('assignee'))}
                                    >
                                        <MenuItem disabled>Select assignee</MenuItem>
                                        {project?.developers.map(item => (
                                            <MenuItem key={item._id} value={item._id}>{item.displayName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">Milestone</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={state.milestone}
                                        label='Milestone'
                                        name='milestone'
                                        onChange={handleInputChange}
                                        sx={{minWidth: 200}}
                                        error={Boolean(getFieldError('milestone'))}
                                        required
                                    >
                                        <MenuItem disabled>Assign milestone</MenuItem>
                                        {milestones.map(item => (
                                            <MenuItem key={item._id} value={item._id}>{item.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <LoadingButton
                                    loading={createLoading}
                                    variant='contained'
                                    type='submit'
                                >
                                    Create issue
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Box>
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default IssuesPage;