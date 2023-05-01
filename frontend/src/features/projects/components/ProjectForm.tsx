import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {selectCreateProjectError, selectCreateProjectLoading} from '../projectsSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {createProject} from '../projectsThunks';
import {Box, Grid, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {ProjectMutation} from '../../../types';

const ProjectForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectCreateProjectLoading);
    const error = useAppSelector(selectCreateProjectError);

    const [project, setProject] = useState<ProjectMutation>({
        name: '',
        description: '',
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setProject(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(createProject(project)).unwrap();
        await navigate('/');
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Box component='form' onSubmit={submitFormHandler} mt={2}>
            <Grid container spacing={2} textAlign='center' flexDirection='column'>
                <Typography>Create blank project</Typography>
                <Grid item>
                    <TextField
                        label='Project name'
                        name='name'
                        autoComplete='new-name'
                        value={project.name}
                        onChange={inputChangeHandler}
                        error={Boolean(getFieldError('name'))}
                        helperText={getFieldError('name')}
                        required
                    />
                </Grid>
                <Grid item>
                    <TextField
                        multiline
                        rows={4}
                        label='Description'
                        name='description'
                        autoComplete='new-description'
                        value={project.description}
                        onChange={inputChangeHandler}
                    />
                </Grid>
                <Grid item>
                    <LoadingButton loading={loading} variant='contained' type='submit'>create project</LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProjectForm;