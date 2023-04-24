import React from 'react';
import Projects from '../features/projects/components/Projects';

interface Props {
    dashboard: string;
}

const Development: React.FC<Props> = ({dashboard}) => {
    return (
        <>
            {dashboard ? dashboard === 'projects' &&
                <Projects dashboard={dashboard}/> : <Projects dashboard={dashboard}/>
            }
        </>
    );
};

export default Development;