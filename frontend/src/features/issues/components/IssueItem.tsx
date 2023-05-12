import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LayersIcon from '@mui/icons-material/Layers';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useAppSelector} from '../../../app/hooks';
import {selectProject} from '../../projects/projectsSlice';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import {Task} from '../../../types';

interface Props {
    item: Task;
}

const IssueItem: React.FC<Props> = ({item}) => {
    const project = useAppSelector(selectProject);
    dayjs.extend(relativeTime);

    const currentDate = dayjs();
    const creationDate = dayjs(item.creationDate);
    const daysAgo = creationDate.from(currentDate);


    const color = item.status === 'new' ? 'green' : item.status === 'in progress' ? 'yellow' : 'red';
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
                                {item.title}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle2' color='grey'>
                            created {daysAgo} by {project?.manager.displayName}
                             <WatchLaterOutlinedIcon fontSize='small'/> {item.milestone.title}
                        </Typography>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails sx={{background: 'WhiteSmoke'}}>
                <Typography>Description: {item.description}</Typography>
                <Typography></Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default IssueItem;