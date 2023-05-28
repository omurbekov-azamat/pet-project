import React, {useState} from 'react';
import {
    Button, createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    styled,
    ThemeProvider,
    Typography
} from '@mui/material';

const ChatButton = () => {
    const [open, setOpen] = useState(false);

    const MyButton = styled(Button)({
        position: 'fixed',
        bottom: 40,
        right: 40,
        width: 50,
        height: 60,
        padding: 0,
        borderRadius: '50%',
        backgroundColor: '#15d466',
        '&:hover': {
            backgroundColor: '#128c7e',
        },
        zIndex: 9999,
    });

    const theme = createTheme({
        palette: {
            primary: {
                main: '#ffffff',
            },
        },
    });

    const handleClick = () => {
        setOpen(true);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <MyButton onClick={handleClick}>
                    Chat
                </MyButton>
            </ThemeProvider>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Chat</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">chat is here</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>close</Button>
                </DialogActions>
            </Dialog>
        </>
    );

};

export default ChatButton;