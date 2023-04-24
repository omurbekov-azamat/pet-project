import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {selectBreadcrumb} from '../../../features/projects/projectsSlice';
import {useAppSelector} from '../../../app/hooks';
import Divider from '@mui/material/Divider';
import {Link} from '../../../helpers';

interface Props {
    managerName: string;
    projectName: string;
}

const BasicBreadcrumbs: React.FC<Props> = ({managerName, projectName}) => {
    const breadcrumb = useAppSelector(selectBreadcrumb);
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" sx={{mt: 2}}>
                <Link to={managerName ? '#' : '/'}>{managerName ? managerName : 'Your work'}</Link>
                <Typography color="text.primary" textTransform='capitalize'>
                    {projectName ? projectName : breadcrumb}
                </Typography>
            </Breadcrumbs>
            <Divider sx={{mt: 0.5}}/>
        </>
    );
};

export default BasicBreadcrumbs;