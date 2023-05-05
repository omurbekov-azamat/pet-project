import React, {useEffect, useState} from 'react';
import {Button, Checkbox, FormControlLabel, FormGroup, Menu} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectDevelopers} from '../../users/usersSlice';
import {getDevelopers} from '../../users/usersThunks';
import {enqueueSnackbar, SnackbarProvider} from 'notistack';

const ProjectAddDeveloper = () => {
    const dispatch = useAppDispatch();
    const developers = useAppSelector(selectDevelopers);

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

    const handleOnClick = () => {
        if (chooseDevelopers.length > 0) {
            console.log(chooseDevelopers);
        } else {
            enqueueSnackbar('You have to choose developer', {variant: 'warning'});
        }
    }

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
            <Button onClick={handleOnClick}>Add developers</Button>
        </>
    );
};

export default ProjectAddDeveloper;