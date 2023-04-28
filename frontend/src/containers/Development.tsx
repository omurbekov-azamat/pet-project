import React from 'react';
import Projects from '../features/projects/components/Projects';
import ProjectForm from '../features/projects/components/ProjectForm';

interface Props {
    dashboard: string;
    managerName: string;
    projectName: string;
    projectId: string;
}

const Development: React.FC<Props> = ({dashboard, managerName, projectName, projectId}) => {
    let showDevelopment = dashboard === 'projects' &&
        <Projects dashboard={dashboard} managerName={managerName} projectName={projectName} projectId={projectId}/>
    if (dashboard === 'new-project') {
        showDevelopment = <ProjectForm/>
    }
    return (
        <>
            {showDevelopment}
        </>
    );
};

export default Development;