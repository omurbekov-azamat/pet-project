import React from 'react';
import {moveBreadcrumbs} from '../../../features/projects/projectsSlice';
import {useAppDispatch} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DraftsIcon from '@mui/icons-material/Drafts';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import {Avatar} from '@mui/material';
import {Params} from '../../../types';

interface Props {
    catchParams: Params;
}

const ListGroup: React.FC<Props> = ({catchParams}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const moveBread = (bread: string, work?: string) => {
        dispatch(moveBreadcrumbs(bread));
        const destination = work ? '/' : `/dashboard/${bread}`;
        navigate(destination);
    };

    const renderProjectItems = () => (
        <>
            <ListItem disablePadding>
                <ListItemButton sx={{textTransform: 'capitalize'}}
                                onClick={() => navigate(`/${catchParams.managerName}/${catchParams.projectName}/${catchParams.id}`)}>
                    <Avatar sx={{background: 'lightBlue', borderRadius: '5px', mr: 3, ml: -1}}>
                        {catchParams.projectName[0]}
                    </Avatar>
                    {catchParams.projectName}
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton
                    onClick={() => navigate(`/projectInformation/${catchParams.managerName}/${catchParams.projectName}/${catchParams.id}`)}>
                    <ListItemIcon>
                        <AccountTreeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Project information"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton
                    onClick={() => navigate(`/issues/${catchParams.managerName}/${catchParams.projectName}/${catchParams.id}`)}>
                    <ListItemIcon>
                        <DraftsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Issues"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton
                    onClick={() => navigate(`/milestones/${catchParams.managerName}/${catchParams.projectName}/${catchParams.id}`)}>
                    <ListItemIcon>
                        <HourglassTopIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Milestones"/>
                </ListItemButton>
            </ListItem>
        </>
    );

    const renderDefaultItems = () => (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={() => moveBread('projects', 'work')}>
                    <ListItemIcon>
                        <BusinessCenterIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Your work"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => moveBread('projects')}>
                    <ListItemIcon>
                        <AccountTreeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Projects"/>
                </ListItemButton>
            </ListItem>
        </>
    );

    return (
        <Box
            sx={{
                minWidth: 200,
                height: '100%',
                maxHeight: '300px',
                background: '#fbfafd;',
            }}
            borderRadius={2}
            mx={1}
        >
            <nav aria-label="main mailbox folders">
                <List>
                    {catchParams.projectName ? (
                        renderProjectItems()
                    ) : (
                        renderDefaultItems()
                    )}
                </List>
            </nav>
        </Box>
    );
};

export default ListGroup;


