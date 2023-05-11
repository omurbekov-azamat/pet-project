import React from 'react';
import TabPanel from '@mui/lab/TabPanel';
import {TabContext, TabList} from '@mui/lab';
import {Box, Tab} from '@mui/material';
import {Params} from '../../../types';

interface Props {
    catchParams: Params;
}

const IssuesPage: React.FC<Props> = ({catchParams}) => {
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
                        <Tab label="New issue" value="4"/>
                    </TabList>
                </Box>
                <TabPanel value='1'>open</TabPanel>
                <TabPanel value='2'>in progress</TabPanel>
                <TabPanel value='3'>closed</TabPanel>
                <TabPanel value='4'>here is issue form</TabPanel>
            </TabContext>
        </Box>
    );
};

export default IssuesPage;