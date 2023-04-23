import React, {useEffect} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {getProjects} from './projectsThunks';

export interface Props {
    dashboard: string | undefined;
}

const Projects: React.FC<Props> = ({dashboard}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch, dashboard]);

    return (
        <>
            {dashboard}
        </>
    );
};

export default Projects;