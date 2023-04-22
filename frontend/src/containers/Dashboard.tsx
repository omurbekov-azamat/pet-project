import React from 'react';
import BasicBreadcrumbs from '../components/UI/Breadcrumbs/BasicBreadcrumbs';
import {useParams} from 'react-router-dom';
import ListGroup from '../components/UI/ListGroup/ListGroup';
import {Grid} from '@mui/material';
import Development from './Development';

const Dashboard = () => {
    const {listName} = useParams() as { listName: string };
    return (
        <>
            <Grid container>
                <Grid item>
                    <ListGroup/>
                </Grid>
                <Grid item>
                    <Grid container flexDirection='column'>
                        <Grid item>
                            <BasicBreadcrumbs/>
                        </Grid>
                        <Grid item mt={2}>
                            <Development dashboard={listName}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;