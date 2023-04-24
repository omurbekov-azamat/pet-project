import React from 'react';
import BasicBreadcrumbs from '../components/UI/Breadcrumbs/BasicBreadcrumbs';
import {useParams} from 'react-router-dom';
import ListGroup from '../components/UI/ListGroup/ListGroup';
import {Grid} from '@mui/material';
import Development from './Development';

const Dashboard = () => {
    const {listName} = useParams() as { listName: string };
    const {managerName} = useParams() as { managerName: string };
    const {projectName} = useParams() as { projectName: string };

    return (
        <Grid container>
            <Grid item xs={11} sm={4} lg={3} xl={3}>
                <ListGroup projectName={projectName}/>
            </Grid>
            <Grid item xs>
                <Grid container flexDirection='column'>
                    <Grid item>
                        <BasicBreadcrumbs projectName={projectName} managerName={managerName}/>
                    </Grid>
                    <Grid item mt={2}>
                        <Development
                            dashboard={listName ? listName : 'projects'}
                            projectName={projectName}
                            managerName={managerName}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;