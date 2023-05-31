import React from 'react';
import IssueItem from './IssueItem';
import {useAppSelector} from '../../../app/hooks';
import {selectFetchIssuesLoading} from '../issuesSlice';
import {Task} from '../../../types';
import Spinner from '../../../components/UI/Spinner/Spinner';

interface Props {
    items: Task[]
}

const IssueItems: React.FC<Props> = ({items}) => {
    const loading = useAppSelector(selectFetchIssuesLoading);
    return (
        <>
            {loading && <Spinner/>}
            {items.map(item => (
                <IssueItem key={item._id} item={item}/>
            ))}
        </>
    );
};

export default IssueItems;