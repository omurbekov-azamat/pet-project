import React from 'react';
import Projects from '../features/projects/components/Projects';

interface Props {
    dashboard: string;
    managerName: string;
    projectName: string;
    projectId: string;
}

const Development: React.FC<Props> = ({dashboard, managerName, projectName, projectId}) => {
    let showDevelopment = dashboard === 'projects' && <Projects dashboard={dashboard} managerName={managerName} projectName={projectName} projectId={projectId}/>
    return (
        <>
            {showDevelopment}
        </>
    );
};

export default Development;