import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectFetchMilestonesLoading, selectMilestones} from '../milestonesSlice';
import {Divider, Grid, Typography} from '@mui/material';
import MilestoneItem from './MilestoneItem';
import {getProjectMilestones} from '../milestonesThunks';

interface Props {
    projectId: string;
}

const MilestoneItems: React.FC<Props> = ({projectId}) => {
    const dispatch = useAppDispatch();
    const fetchMilestonesLoading = useAppSelector(selectFetchMilestonesLoading);
    const milestones = useAppSelector(selectMilestones);

    useEffect(() => {
        dispatch(getProjectMilestones(projectId))
    }, [dispatch, projectId]);

    return (
        <>
            {fetchMilestonesLoading && <Typography>loading...</Typography>}
            <Grid container spacing={2}>
                {milestones && milestones.length > 0 ? (
                    milestones.map(item => (
                        <MilestoneItem key={item._id} item={item} />
                    ))
                ) : (
                    <Typography>There are no milestones yet</Typography>
                )}
                <Divider />
            </Grid>
        </>
    );
};

export default MilestoneItems;