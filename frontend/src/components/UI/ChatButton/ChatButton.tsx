import React, {useState} from 'react';
import {
    Button, Container, createTheme,
    Dialog,
    DialogContent,
    Grid,
    styled, TextField,
    ThemeProvider,
    Typography
} from '@mui/material';
import {Online} from '../../../types';

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
    onlineUsers: Online[]
}

const ChatButton: React.FC<Props> = ({onlineUsers}) => {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState('');
    const handleClick = () => {
        setOpen(true);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(state);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <MyButton onClick={handleClick}>
                    Chat
                </MyButton>
            </ThemeProvider>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent sx={{px: 1, py: 1}}>
                    <Container sx={{minWidth: '275px'}}>
                        <Grid container flexDirection='column'>
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
                            </Grid>
                        </Grid>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );

};

export default ChatButton;