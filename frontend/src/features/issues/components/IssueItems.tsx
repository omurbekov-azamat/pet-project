import React from 'react';
import IssueItem from './IssueItem';
import {useAppSelector} from '../../../app/hooks';
import {selectFetchIssuesLoading} from '../issuesSlice';
import {Typography} from '@mui/material';
import {Task} from '../../../types';

interface Props {
    items: Task[]
}

const IssueItems: React.FC<Props> = ({items}) => {
    const loading = useAppSelector(selectFetchIssuesLoading);
    return (
        <>
            {loading && <Typography>loading...</Typography>}
            {items.map(item => (
                <IssueItem key={item._id} item={item}/>
            ))}
        </>
    );
};

export default IssueItems;