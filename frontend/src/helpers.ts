import {styled} from '@mui/material';
import {Link as NavLink} from 'react-router-dom';
import {MessageMutation} from './types';

export const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});

export const websocketSend = (ws: React.MutableRefObject<WebSocket | null>, type: string, payload: string | MessageMutation) => {
    if (!ws.current) return;

    ws.current?.send(JSON.stringify({
        type,
        payload,
    }));
};