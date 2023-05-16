import React, {useState} from 'react';
import {selectLogoutLoading} from '../../../features/users/usersSlice';
import {Avatar, Button, Grid, Menu, MenuItem} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {logout} from '../../../features/users/usersThunks';
import {useNavigate} from 'react-router-dom';
import {apiURL} from '../../../constants';
import {User} from '../../../types';

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLogoutLoading);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        await navigate('/');
    };

    return (
        <>
            <Grid container>
                <Grid item>
                    <Avatar alt={user.displayName} src={user.avatar && apiURL + '/' + user.avatar}/>
                </Grid>
                <Grid item>
                    <Button
                        onClick={handleClick}
                        color="inherit"
                    >
                        Hello, {user.displayName}
                    </Button>
                </Grid>
            </Grid>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout} disabled={loading}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;