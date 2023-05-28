import React from 'react';
import {Outlet} from "react-router-dom";
import {Box, Container, CssBaseline} from "@mui/material";
import AppToolbar from '../components/UI/Apptoolbar/AppToolbar';
import Footer from '../components/UI/Footer/Footer';
import ChatButton from '../components/UI/ChatButton/ChatButton';
import {useAppSelector} from '../app/hooks';
import {selectUser} from '../features/users/usersSlice';

const Home = () => {
    const user = useAppSelector(selectUser);
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}} className="App">
            <header>
                <CssBaseline/>
                <AppToolbar/>
            </header>
            <Container maxWidth="xl" component="main" sx={{flex: 1, m: 'auto'}}>
                {user && <ChatButton/>}
                <Outlet/>
            </Container>
            <footer style={{flexShrink: 0}}>
                <Footer/>
            </footer>
        </Box>
    );
};

export default Home;