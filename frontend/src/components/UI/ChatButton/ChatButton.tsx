import React, {useState} from 'react';
import {
    Badge,
    Button, Container, createTheme,
    Dialog,
    DialogContent,
    Grid,
    styled, TextField,
    ThemeProvider,
    Typography
} from '@mui/material';
import {websocketSend} from '../../../helpers';
import {useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../../features/users/usersSlice';
import {Message, Online} from '../../../types';

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

interface Props {
    onlineUsers: Online[];
    messages: Message[];
    ws: React.MutableRefObject<WebSocket | null>;
}

const ChatButton: React.FC<Props> = ({onlineUsers, ws, messages}) => {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState('');

    const user = useAppSelector(selectUser);

    const handleClick = () => {
        setOpen(true);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            websocketSend(ws, 'SEND_MESSAGE', {_id: user._id, message: state});
            setState('');
        }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <MyButton onClick={handleClick}>
                    <Badge badgeContent={onlineUsers.length} color="error">
                        Chat
                    </Badge>
                </MyButton>
            </ThemeProvider>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent sx={{px: 1, py: 1}}>
                    <Container sx={{minWidth: '275px'}}>
                        <Grid container flexDirection='column' spacing={3}>
                            <Grid item>
                                <Typography variant='h5' component='div' color='red'>
                                    Online users:
                                </Typography>
                                {onlineUsers.map(item => (
                                    <Typography key={item._id}>
                                        <b>Name: </b> {item.displayName}
                                    </Typography>
                                ))}
                            </Grid>
                            <Grid item>
                                <Grid container direction='column' justifyContent='space-around'>
                                    <Grid item height={380} overflow='auto'>
                                        <Typography variant='h5' component='div' color='blue'>
                                            Messages:
                                        </Typography>
                                        {messages.map(item => (
                                            <Typography key={Math.random()*9999}>
                                                <b>{item.user.displayName}:</b> {item.message}
                                            </Typography>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <form onSubmit={submitFormHandler}>
                                    <Grid container direction='row' alignItems='center'>
                                        <Grid item xs={8}>
                                            <TextField
                                                value={state}
                                                onChange={inputChangeHandler}
                                                label='Message'
                                                fullWidth={true}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button
                                                type='submit'
                                                color='warning'
                                                variant='contained'
                                                sx={{height: '55px', width: '100%'}}
                                            >
                                                Send
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );

};

export default ChatButton;