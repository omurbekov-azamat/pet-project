import React from 'react';
import {googleLogin} from '../../../features/users/usersThunks';
import {useAppDispatch} from '../../../app/hooks';
import {GoogleLogin} from "@react-oauth/google";
import {Box} from "@mui/material";
import {useNavigate} from 'react-router-dom';

const LoginWithGoogle = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const googleRegisterHandler = async (credentials: string) => {
        await dispatch(googleLogin(credentials)).unwrap();
        await navigate('/');
    };

    return (
        <Box sx={{pt: 2}}>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                        void googleRegisterHandler(credentialResponse.credential);
                    }
                }}
                onError={() => {
                    console.log('Login failed');
                }}
            />
        </Box>
    );
};

export default LoginWithGoogle;