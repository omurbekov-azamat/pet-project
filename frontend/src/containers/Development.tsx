import React from 'react';
import {Typography} from '@mui/material';
import ProjectForm from '../features/projects/components/ProjectForm';
import Projects from '../features/projects/components/Projects';
import Project from '../features/projects/components/Project';
import {Params} from '../types';
import ProjectInformation from '../features/projects/components/ProjectInformation';
import ProjectIssues from '../features/projects/components/ProjectIssues';
import MilestonePage from '../features/milestones/components/MilestonePage';

interface Props {
    catchParams: Params;
}

const Development: React.FC<Props> = ({catchParams}) => {
    let showDevelopment = <></>;

    if (catchParams.listName === 'projects' || catchParams.listName === undefined) {
        showDevelopment = <Projects/>
    }

    if (catchParams.projectName && catchParams.managerName && catchParams.id) {
        showDevelopment = <Project catchParams={catchParams}/>
    }

    if (catchParams.dashboard === 'projectInformation') {
        showDevelopment = <ProjectInformation catchParams={catchParams}/>
    }

    if (catchParams.dashboard === 'issues') {
        showDevelopment = <ProjectIssues catchParams={catchParams}/>
    }

    if (catchParams.dashboard === 'milestones') {
        showDevelopment = <MilestonePage catchParams={catchParams}/>
    }

    if (catchParams.dashboard === 'new_issue') {
        showDevelopment = <Typography>Here will be issue form</Typography>
    }

    if (catchParams.listName === 'new-project') {
        showDevelopment = <ProjectForm/>
    }

    if (catchParams.listName === 'issues') {
        showDevelopment = <Typography>All issues</Typography>
    }

    return (
        <>
            {showDevelopment}
        </>
    );
};

export default Development;