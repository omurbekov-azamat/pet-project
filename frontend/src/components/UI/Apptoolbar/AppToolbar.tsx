import React from 'react';
import {selectUser} from '../../../features/users/usersSlice';
import {useAppSelector} from '../../../app/hooks';
import { Link as NavLink } from 'react-router-dom';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});

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