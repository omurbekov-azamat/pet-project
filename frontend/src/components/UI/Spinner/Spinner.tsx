import React from 'react';
import {Box, LinearProgress} from '@mui/material';

const Spinner = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    );
};

export default Spinner;