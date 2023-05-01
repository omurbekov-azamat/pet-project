import React from 'react';
import BasicBreadcrumbs from '../components/UI/Breadcrumbs/BasicBreadcrumbs';
import {useParams} from 'react-router-dom';
import ListGroup from '../components/UI/ListGroup/ListGroup';
import {Grid} from '@mui/material';
import Development from './Development';
import {Params} from '../types';

const Dashboard = () => {
    const catchParams: Params = useParams() as { listName: string, managerName: string, projectName: string, id: string, dashboard: string };
    return (
        <Grid container>
            <Grid item xs={11} sm={5} lg={3} xl={3}>
                <ListGroup catchParams={catchParams}/>
            </Grid>
            <Grid item xs>
                <Grid container flexDirection='column'>
                    <Grid item>
                        <BasicBreadcrumbs catchParams={catchParams}/>
                    </Grid>
                    <Grid item mt={2}>
                        <Development catchParams={catchParams}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;