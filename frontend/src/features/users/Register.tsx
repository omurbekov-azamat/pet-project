import React, {useState} from 'react';
import {Avatar, Box, Container, Grid, Link, TextField, Typography} from '@mui/material';
import {selectRegisterError, selectRegisterLoading} from './usersSlice';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FileInput from '../../components/UI/FileInput/FileInput';
import {register} from './usersThunks';
import {LoadingButton} from "@mui/lab";
import {RegisterMutation} from '../../types';

const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const loading = useAppSelector(selectRegisterLoading);
    const navigate = useNavigate();

    const [state, setState] = useState<RegisterMutation>({
        email: '',
        password: '',
        displayName: '',
        image: null,
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setState(prev => ({
            ...prev, [name]: files && files[0] ? files[0] : null,
        }));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(register(state)).unwrap();
        await navigate('/');
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
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
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
                    <Grid container spacing={2} textAlign='center'>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                type='email'
                                name="email"
                                autoComplete="new-email"
                                value={state.email}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('email'))}
                                helperText={getFieldError('email')}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                value={state.password}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('password'))}
                                helperText={getFieldError('password')}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="displayName"
                                label="displayName"
                                type="displayName"
                                autoComplete="new-displayName"
                                value={state.displayName}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('displayName'))}
                                helperText={getFieldError('displayName')}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FileInput
                                label='avatar'
                                onChange={fileInputChangeHandler}
                                name='image'
                                type='images/*'
                                error={error}
                                margin='110px'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton
                                type='submit'
                                color='secondary'
                                loading={loading}
                                variant='contained'
                                sx={{mb: 2}}
                            >
                                Sign Up
                            </LoadingButton>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;