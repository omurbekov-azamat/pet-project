import React from 'react';
import {Task} from '../../../types';

interface Props {
    item: Task;
}

const IssueItem: React.FC<Props> = ({item}) => {
    return (
        <div>
            {item.title}
        </div>
    );
};

export default IssueItem;