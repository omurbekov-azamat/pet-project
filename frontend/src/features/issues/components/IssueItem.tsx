import React, {useEffect} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, FormControl, Grid, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LayersIcon from '@mui/icons-material/Layers';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectProject} from '../../projects/projectsSlice';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import {LoadingButton} from '@mui/lab';
import {selectUser} from '../../users/usersSlice';
import {getProjectTasks, tryChangeTask} from '../issuesThunks';
import {selectChangeIssueLoading} from '../issuesSlice';
import {Task} from '../../../types';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import {useParams} from 'react-router-dom';
import {getProject} from '../../projects/projectsThunks';

interface Props {
    item: Task;
}

dayjs.extend(relativeTime);
const IssueItem: React.FC<Props> = ({item}) => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const project = useAppSelector(selectProject);
    const changeIssueLoading = useAppSelector(selectChangeIssueLoading);

    const [assignee, setAssignee] = React.useState('');

    const handleInputChange = async (event: SelectChangeEvent) => {
        setAssignee(event.target.value);
        await dispatch(tryChangeTask({id: item._id, assignee: event.target.value}));
        await dispatch(getProjectTasks({id: item.project, status: 'new'}));
    };

    const currentDate = dayjs();
    const creationDate = dayjs(item.creationDate);
    const daysAgo = creationDate.from(currentDate);
    const color = item.status === 'new' ? 'green' : item.status === 'in progress' ? 'yellow' : 'red';

    useEffect(() => {
        if (!project && id) {
            dispatch(getProject(id));
        }
    }, [dispatch, id, project]);

    const onClickAssignYourself = async (issueId: string, projectId: string) => {
        await dispatch(tryChangeTask({id: issueId, assignee: user?._id}));
        await dispatch(getProjectTasks({id: projectId, status: 'new'}));
    };

    const onClickCloseTask = async (issueId: string, projectId: string) => {
        await dispatch(tryChangeTask({id: issueId, status: 'done'}));
        await dispatch(getProjectTasks({id: projectId, status: 'in progress'}));
    };

    const onClickStartTask = async (issueId: string, projectId: string) => {
        await dispatch(tryChangeTask({id: issueId, status: 'in progress'}));
        await dispatch(getProjectTasks({id: projectId, status: 'new'}));
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container alignItems='center'>
                            <Grid item>
                                <LayersIcon sx={{color}} fontSize='large'/>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    {item.title}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems='center' justifyContent='space-between'>
                            <Grid item>
                                <Typography variant='subtitle2' color='grey'>
                                    created {daysAgo} by {project?.manager.displayName}
                                    <WatchLaterOutlinedIcon fontSize='small'/> {item.milestone.title}
                                </Typography>
                                {item.spendTime && <Typography color='blueviolet'>Spend
                                    time: {item.spendTime.hours}:{item.spendTime.minutes}</Typography>}
                            </Grid>
                            <Grid item>
                                <Typography variant='subtitle2' color='grey'>
                                    assignee: {item.assignee ? item.assignee.displayName : 'none'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails sx={{background: 'WhiteSmoke'}}>
                <Typography>Description: {item.description}</Typography>
                <Box textAlign='right'>
                    {!item.assignee && user?.role === 'developer' &&
                        <LoadingButton
                            loading={changeIssueLoading === item._id}
                            onClick={() => onClickAssignYourself(item._id, item.project)}
                        >
                            assign yourself
                        </LoadingButton>
                    }
                    {item && item.assignee && item.status === 'in progress' && user?._id === item.assignee._id &&
                        <LoadingButton
                            loading={changeIssueLoading === item._id} color='error'
                            onClick={() => onClickCloseTask(item._id, item.project)}
                        >
                            Close issue
                        </LoadingButton>
                    }
                    {item.assignee && item.status === 'new' && user?._id === item.assignee._id &&
                        <LoadingButton
                            loading={changeIssueLoading === item._id} color='warning'
                            onClick={() => onClickStartTask(item._id, item.project)}
                        >
                            Start issue
                        </LoadingButton>
                    }
                    {user?.role === 'manager' && item.status === 'new' &&
                        <FormControl variant='standard'>
                            <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={assignee}
                                label='Assignee'
                                name='assignee'
                                onChange={handleInputChange}
                                sx={{minWidth: 100, height: '50px'}}
                            >
                                <MenuItem disabled>Select assignee</MenuItem>
                                {project?.developers.map(item => (
                                    <MenuItem key={item._id} value={item._id}>{item.displayName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    }
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default IssueItem;