import React from 'react';
import BasicBreadcrumbs from '../components/UI/Breadcrumbs/BasicBreadcrumbs';
import {useParams} from 'react-router-dom';
import ListGroup from '../components/UI/ListGroup/ListGroup';
import {Grid} from '@mui/material';
import Development from './Development';

const Dashboard = () => {
    const catchParams = useParams() as { listName: string, managerName: string, projectName: string, id: string };

    return (
        <Grid container>
            <Grid item xs={11} sm={4} lg={3} xl={3}>
                <ListGroup projectName={catchParams.projectName}/>
            </Grid>
            <Grid item xs>
                <Grid container flexDirection='column'>
                    <Grid item>
                        <BasicBreadcrumbs projectName={catchParams.projectName} managerName={catchParams.managerName}/>
                    </Grid>
                    <Grid item mt={2}>
                        <Development
                            dashboard={catchParams.listName ? catchParams.listName : 'projects'}
                            projectName={catchParams.projectName}
                            managerName={catchParams.managerName}
                            projectId={catchParams.id}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;