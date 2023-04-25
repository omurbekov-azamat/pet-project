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
import {Avatar} from '@mui/material';

interface Props {
    projectName: string;
}

const ListGroup: React.FC<Props> = ({projectName}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const moveBread = (bread: string, work?: string) => {
        dispatch(moveBreadcrumbs(bread));
        const destination = work ? '/' : `/dashboard/${bread}`;
        navigate(destination);
    }

    return (
        <Box sx={{width: '100%', minWidth: 200, bgcolor: 'background.paper'}}>
            <nav aria-label="main mailbox folders">
                <List>
                    {projectName ? (
                        <>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <Avatar
                                        sx={{background: 'lightBlue', borderRadius: '5px', mr: 3, ml: -1}}
                                    >
                                        {projectName[0]}
                                    </Avatar>
                                    {projectName}
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AccountTreeIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Project information"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DraftsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Issues"/>
                                </ListItemButton>
                            </ListItem>
                        </>
                    ) : (
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
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => moveBread('issues')}>
                                    <ListItemIcon>
                                        <DraftsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Issues"/>
                                </ListItemButton>
                            </ListItem>
                        </>
                    )}
                </List>
            </nav>
        </Box>
    );
};

export default ListGroup;