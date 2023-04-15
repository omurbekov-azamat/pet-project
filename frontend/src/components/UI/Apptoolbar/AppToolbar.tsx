import React from 'react';
import {selectUser} from '../../../features/users/usersSlice';
import {useAppSelector} from '../../../app/hooks';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import {Link} from '../../../helpers';

const AppToolbar = () => {
    const user = useAppSelector(selectUser);

    return (
        <AppBar position="sticky" sx={{mb: 2}}>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div">
                        <Link to="/">Issues Tracker</Link>
                    </Typography>
                    <Grid item>
                        {user ? (
                            <UserMenu user={user}/>
                        ): (
                            <AnonymousMenu/>
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;