import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectFetchMilestonesLoading, selectMilestones} from '../milestonesSlice';
import {Divider, Typography} from '@mui/material';
import MilestoneItem from './MilestoneItem';
import {getProjectMilestones} from '../milestonesThunks';
import {getProjectTasks} from '../../issues/issuesThunks';
import Spinner from '../../../components/UI/Spinner/Spinner';

interface Props {
    projectId: string;
}

const MilestoneItems: React.FC<Props> = ({projectId}) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const dispatch = useAppDispatch();
    const fetchMilestonesLoading = useAppSelector(selectFetchMilestonesLoading);
    const milestones = useAppSelector(selectMilestones);

    const handleChange = (milestoneId: string, projectId: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? milestoneId : false);
        dispatch(getProjectTasks({id: projectId, milestone: milestoneId}));
    };
    useEffect(() => {
        dispatch(getProjectMilestones(projectId))
    }, [dispatch, projectId]);

    return (
        <>
            {fetchMilestonesLoading && <Spinner/>}
            {milestones && milestones.length > 0 ? (
                milestones.map(item => (
                    <MilestoneItem expended={expanded === item._id} handleChange={handleChange} key={item._id}
                                   item={item}/>
                ))
            ) : (
                <Typography>There are no milestones yet</Typography>
            )}
            <Divider/>
        </>
    );
};

export default MilestoneItems;