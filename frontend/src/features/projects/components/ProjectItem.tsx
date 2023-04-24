import React from 'react';
import {selectUser} from '../../users/usersSlice';
import {useAppSelector} from '../../../app/hooks';
import {Avatar, Divider, Grid, Typography} from '@mui/material';
import {Project} from '../../../types';

interface Props {
    item: Project;
}

const ProjectItem: React.FC<Props> = ({item}) => {
    const user = useAppSelector(selectUser);
    const role = user && user.role === 'manager' ? 'Manager' : 'Developer';
    return (
        <Grid item mb={2}>
            <Grid container>
                <Grid item>
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item>
                            <Avatar
                                sx={{background: 'lightBlue', borderRadius: '5px'}}
                            >
                                {item.name[0]}
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography>
                                {item.manager.displayName + ' / ' + item.name.toUpperCase()}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                border={1}
                                p={0.5}
                                borderRadius={4}
                                borderColor='lightgray'
                                color='lightslategrey'
                            >
                                {role}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{mt: 1}}/>
        </Grid>
    );
};

export default ProjectItem;