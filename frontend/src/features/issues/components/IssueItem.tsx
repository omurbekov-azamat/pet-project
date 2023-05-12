import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography} from '@mui/material';
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

interface Props {
    item: Task;
}

dayjs.extend(relativeTime);
const IssueItem: React.FC<Props> = ({item}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const project = useAppSelector(selectProject);
    const changeIssueLoading = useAppSelector(selectChangeIssueLoading);

    const currentDate = dayjs();
    const creationDate = dayjs(item.creationDate);
    const daysAgo = creationDate.from(currentDate);
    const color = item.status === 'new' ? 'green' : item.status === 'in progress' ? 'yellow' : 'red';

    const onClickAssignYourself = async (issueId: string, projectId: string) => {
        await dispatch(tryChangeTask({id: issueId, assignee: user?._id}));
        await dispatch(getProjectTasks({id: projectId, status: 'new'}));
    }

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
                {!item.assignee && user?.role === 'developer' &&
                    <Box textAlign='right'>
                        <LoadingButton
                            loading={changeIssueLoading === item._id}
                            onClick={() => onClickAssignYourself(item._id, item.project)}
                        >
                            assign yourself
                        </LoadingButton>
                    </Box>}
            </AccordionDetails>
        </Accordion>
    );
};

export default IssueItem;