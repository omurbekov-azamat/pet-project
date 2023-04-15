import React from 'react';
import ListGroup from '../components/UI/ListGroup/ListGroup';
import BasicBreadcrumbs from '../components/UI/Breadcrumbs/BasicBreadcrumbs';
import {Grid} from '@mui/material';

const Dashboard = () => {
    return (
        <>
            <Grid container>
                <Grid item>
                    <ListGroup/>
                </Grid>
                <Grid item>
                    <BasicBreadcrumbs/>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;