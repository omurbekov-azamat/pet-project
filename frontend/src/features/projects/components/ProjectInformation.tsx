import React, {useEffect} from 'react';
import {Params} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectFetchProjectLoading, selectProject} from '../projectsSlice';
import {getProject} from '../projectsThunks';
import {Typography} from '@mui/material';

interface Props {
    catchParams: Params;
}


const ProjectInformation: React.FC<Props> = ({catchParams}) => {
    const dispatch = useAppDispatch();
    const projectLoading = useAppSelector(selectFetchProjectLoading);
    const project = useAppSelector(selectProject);

    useEffect(() => {
        dispatch(getProject(catchParams.id));
    }, [dispatch, catchParams.id]);

    return (
        <>
            {projectLoading && <Typography>loading...</Typography>}
            <Typography>Description: {project?.description}</Typography>
        </>
    );
};

export default ProjectInformation;