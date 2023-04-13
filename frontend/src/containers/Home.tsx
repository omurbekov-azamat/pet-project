import React from 'react';
import {Outlet} from "react-router-dom";
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from '../components/UI/Apptoolbar/AppToolbar';

const Home = () => {
    return (
        <>
            <CssBaseline/>
            <AppToolbar/>
            <Container maxWidth="lg">
                <Outlet/>
            </Container>
        </>
    );
};

export default Home;