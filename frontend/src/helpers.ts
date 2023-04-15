import {styled} from '@mui/material';
import {Link as NavLink} from 'react-router-dom';

export const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});