import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Outlet} from "react-router-dom";
import {Box, Container, CssBaseline} from "@mui/material";
import AppToolbar from '../components/UI/Apptoolbar/AppToolbar';
import Footer from '../components/UI/Footer/Footer';
import ChatButton from '../components/UI/ChatButton/ChatButton';
import {useAppSelector} from '../app/hooks';
import {selectUser} from '../features/users/usersSlice';
import {websocketSend} from '../helpers';
import {IncomingMessage, Online} from '../types';

const Home = () => {
    const user = useAppSelector(selectUser);

    const [onlineUsers, setOnlineUsers] = useState<Online[]>([]);
    const ws = useRef<null | WebSocket>(null);

    const connect = useCallback(() => {
            ws.current = new WebSocket('ws://localhost:8000/chat');
            ws.current.onclose = (event) => {
                if (event.type === 'close') {
                    setTimeout(function () {
                        connect();
                    }, 1000);
                }
                console.log('ws closed');
            };

            ws.current.onmessage = (event) => {
                const decodedMessage = JSON.parse(event.data) as IncomingMessage;
                if (decodedMessage.type === 'ONLINE_USERS') {
                    const users = decodedMessage.payload as Online[];
                    setOnlineUsers(users);
                }
            }

            return () => {
                if (ws.current) {
                    ws.current.close();
                }
            };
    }, [ws]);

    useEffect(() => {
        if (user){
            connect();
        }
    }, [connect, user]);

    useEffect(() => {
        if (!user) {
            websocketSend(ws, 'LOGOUT', 'LOGOUT');
        }
    }, [user]);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}} className="App">
            <header>
                <CssBaseline/>
                <AppToolbar/>
            </header>
            <Container maxWidth="xl" component="main" sx={{flex: 1, m: 'auto'}}>
                {user && <ChatButton onlineUsers={onlineUsers}/>}
                <Outlet/>
            </Container>
            <footer style={{flexShrink: 0}}>
                <Footer/>
            </footer>
        </Box>
    );
};

export default Home;