import React, {useEffect, useState} from 'react';
import {selectAddDevelopersLoading} from '../projectsSlice';
import {selectDevelopers} from '../../users/usersSlice';
import {getDevelopers} from '../../users/usersThunks';
import {toggleDevelopers} from '../projectsThunks';
import {enqueueSnackbar, SnackbarProvider} from 'notistack';
import {Button, Checkbox, FormControlLabel, FormGroup, Menu} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {LoadingButton} from '@mui/lab';
import {Params} from '../../../types';

interface Props {
    catchParams: Params;
}

const ProjectAddDeveloper: React.FC<Props> = ({catchParams}) => {
    const dispatch = useAppDispatch();
    const developers = useAppSelector(selectDevelopers);
    const loading = useAppSelector(selectAddDevelopersLoading);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [chooseDevelopers, setChooseDevelopers] = useState<string[]>([]);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeCheckBox = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        if (checked) {
            const result = await developers.find(item => item._id === name);
            if (result) {
                setChooseDevelopers(prev => [...prev, result._id]);
            }
        } else {
            setChooseDevelopers(prev => prev.filter(item => item !== name));
        }
    };

    const handleOnClick = async () => {
        if (chooseDevelopers.length > 0) {
            await dispatch(toggleDevelopers({id: catchParams.id, useDevelopers: chooseDevelopers}))
            await enqueueSnackbar('You have successfully added developers to the project', {variant: 'success'});
        } else {
            await enqueueSnackbar('You have to choose developer', {variant: 'warning'});
        }
    };

    useEffect(() => {
        dispatch(getDevelopers());
    }, [dispatch]);

    return (
        <>
            <SnackbarProvider/>
            <Button
                onClick={handleClick}
                sx={{
                    color: 'grey',
                    height: '56px',
                    border: '1px solid lightgrey',
                    textTransform: 'capitalize',
                    fontSize: '18px',
                }}
            >
                Choose Developers
            </Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <FormGroup sx={{p: 1}}>
                    {developers.map((developer) => (
                        <FormControlLabel
                            key={developer._id}
                            control={<Checkbox onChange={handleChangeCheckBox} name={developer._id}/>}
                            label={developer.displayName}
                        />
                    ))}
                </FormGroup>
            </Menu>
            <LoadingButton loading={loading} onClick={handleOnClick} variant='contained'>Add developers</LoadingButton>
        </>
    );
};

export default ProjectAddDeveloper;