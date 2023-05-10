import React from 'react';
import {Grid, Typography} from '@mui/material';
import {Milestone} from '../../../types';
import Divider from '@mui/material/Divider';

interface Props {
    item: Milestone;
}

const MilestoneItem: React.FC<Props> = ({item}) => {
    return (
        <Grid item xs={12}>
            <Grid container flexDirection='column'>
                <Grid item xs>
                    <Typography textTransform='uppercase' fontWeight='bolder'>{item.title}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant='subtitle2' color='grey'>{item.startDate} - {item.dueDate}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant='subtitle2'>{item.description}</Typography>
                </Grid>
            </Grid>
            <Divider/>
        </Grid>
    );
};

export default MilestoneItem;