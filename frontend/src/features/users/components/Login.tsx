import React, {useState} from 'react';
import LoginWithGoogle from '../../../components/UI/LoginWithGoogle/LoginWithGoogle';
import {Avatar, Box, Container, Grid, Link, TextField, Typography} from '@mui/material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectLoginError, selectLoginLoading} from '../usersSlice';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {login} from '../usersThunks';
import {LoadingButton} from '@mui/lab';
import Alert from '@mui/material/Alert'
import {LoginMutation, RegisterMutation} from '../../../types';

const initialState: LoginMutation = {
    email: '',
    password: '',
};

interface Props {
    exist?: RegisterMutation;
}

const Login: React.FC<Props> = ({exist = initialState}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(selectLoginError);
    const loading = useAppSelector(selectLoginLoading);

    const [state, setState] = useState<LoginMutation>(exist);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(login(state)).unwrap();
        await setState(exist);
        await navigate('/');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                style={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'red'}}>
                    <LockOpenIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <LoginWithGoogle/>
                {error && (
                    <Alert severity="error" sx={{mt: 3, width: '100%'}}>
                        {error.error}
                    </Alert>
                )}
                <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
                    <Grid container spacing={2} textAlign='center'>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                type='email'
                                variant='standard'
                                autoComplete="current-email"
                                value={state.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                variant='standard'
                                autoComplete="current-password"
                                value={state.password}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton
                                type='submit'
                                color='primary'
                                loading={loading}
                                variant='contained'
                                sx={{mb: 2}}
                            >
                                Sign in
                            </LoadingButton>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/register" variant="body2">
                                Or sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;