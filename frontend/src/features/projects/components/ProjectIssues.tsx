import React from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Params} from '../../../types';

interface Props {
    catchParams: Params;
}

const ProjectIssues: React.FC<Props> = ({catchParams}) => {
    const navigate = useNavigate();

    const onclickNewIssue = () => {
        navigate(`/new_issue/${catchParams.managerName}/${catchParams.projectName}/${catchParams.id}`)
    };

    return (
        <>
            <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item><Typography component='div' variant='h5'>Project Issues</Typography></Grid>
                <Grid item>
                    <Button variant='contained' onClick={onclickNewIssue}>New issue</Button>
                </Grid>
            </Grid>
        </>
    );
};

export default ProjectIssues;