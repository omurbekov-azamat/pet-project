import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {selectBreadcrumb} from '../../../features/projects/projectsSlice';
import {useAppSelector} from '../../../app/hooks';
import Divider from '@mui/material/Divider';
import {Link} from '../../../helpers';

const BasicBreadcrumbs = () => {
    const breadcrumb = useAppSelector(selectBreadcrumb);
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" sx={{mt:2}}>
                <Link to='/'>Your work</Link>
                <Typography color="text.primary" textTransform='capitalize'>{breadcrumb}</Typography>
            </Breadcrumbs>
            <Divider sx={{mt: 0.5}}/>
        </>
    );
};

export default BasicBreadcrumbs;