import React, {useEffect} from 'react';
import {selectFetchProjectLoading, selectProject} from '../projectsSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {getProject,} from '../projectsThunks';
import {Box, Tab, Typography} from '@mui/material';
import {TabContext, TabList} from '@mui/lab';
import TabPanel from '@mui/lab/TabPanel';
import ProjectDevelopers from './ProjectDevelopers';
import {Params} from '../../../types';
import Spinner from '../../../components/UI/Spinner/Spinner';

interface Props {
    catchParams: Params;
}

const ProjectInformation: React.FC<Props> = ({catchParams}) => {
    const dispatch = useAppDispatch();
    const projectLoading = useAppSelector(selectFetchProjectLoading);
    const project = useAppSelector(selectProject);

    const [option, setOption] = React.useState('1');

    const optionHandleChange = (event: React.SyntheticEvent, newValue: string) => {
        setOption(newValue);
    };

    useEffect(() => {
        dispatch(getProject(catchParams.id));
    }, [dispatch, catchParams.id]);

    return (
        <Box sx={{width: '100%'}}>
            <TabContext value={option}>
                <Box sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
                    <TabList onChange={optionHandleChange} aria-label="lab API tabs example">
                        <Tab label="Description" value="1"/>
                        <Tab label="Developers" value="2"/>
                    </TabList>
                </Box>
                <TabPanel value='1'>
                    {projectLoading && <Spinner/>}
                    <Typography mb={2}>{project?.description}</Typography>
                </TabPanel>
                <TabPanel value='2'><ProjectDevelopers/></TabPanel>
            </TabContext>
        </Box>
    );
};

export default ProjectInformation;