import React from 'react';
import TabPanel from '@mui/lab/TabPanel';
import {LoadingButton, TabContext, TabList} from '@mui/lab';
import {Box, Grid, Tab, TextField, Typography} from '@mui/material';
import {useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../users/usersSlice';
import {Params} from '../../../types';

interface Props {
    catchParams: Params;
}

const IssuesPage: React.FC<Props> = ({catchParams}) => {
    const user = useAppSelector(selectUser);
    const [value, setValue] = React.useState(`1`);
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Open" value="1"/>
                        <Tab label="In Progress" value="2"/>
                        <Tab label="Closed" value="3"/>
                        <Tab label="New issue" value="4" disabled={user ? 'manager' !== user.role && true : false}/>
                    </TabList>
                </Box>
                <TabPanel value='1'>open</TabPanel>
                <TabPanel value='2'>in progress</TabPanel>
                <TabPanel value='3'>closed</TabPanel>
                <TabPanel value='4'>
                    <Box component='form'>
                        <Typography fontWeight='bolder'>New Issue</Typography>
                        <Grid container flexDirection='column' spacing={3} mt={1}>
                            <Grid item xs={12}>
                                <TextField label='Title (required)' fullWidth={true}/>
                            </Grid>
                            <Grid item>
                                <TextField rows={4} multiline label='Description' fullWidth={true}/>
                            </Grid>
                            <Grid item>
                                <TextField label='Assignee'/>
                            </Grid>
                            <Grid item>
                                <TextField label='Milestone'/>
                            </Grid>
                            <Grid item>
                                <LoadingButton variant='contained'>Create issue</LoadingButton>
                            </Grid>
                        </Grid>
                    </Box>
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default IssuesPage;