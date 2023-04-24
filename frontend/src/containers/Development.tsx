import React from 'react';
import Projects from '../features/projects/components/Projects';

interface Props {
    dashboard: string;
    managerName: string;
    projectName: string;
}

const Development: React.FC<Props> = ({dashboard, managerName, projectName}) => {
    let showDevelopment = dashboard === 'projects' && <Projects dashboard={dashboard} managerName={managerName} projectName={projectName}/>
    return (
        <>
            {showDevelopment}
        </>
    );
};

export default Development;