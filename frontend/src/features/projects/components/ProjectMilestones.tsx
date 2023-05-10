import React from 'react';
import {Box, Grid, Tab, TextField} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LoadingButton, TabContext, TabList} from '@mui/lab';
import TabPanel from '@mui/lab/TabPanel';
import Alert from '@mui/material/Alert';
import {MilestoneMutation, MilestoneSend} from '../../../types';

const initialState: MilestoneMutation = {
    title: '',
    startDate: null,
    dueDate: null,
    description: '',
};

interface Props {
    exist?: MilestoneMutation;
}

const ProjectMilestones: React.FC<Props> = ({exist = initialState}) => {
    const [state, setState] = React.useState(exist);
    const [value, setValue] = React.useState(`1`);
    const [required, setRequired] = React.useState<boolean>(false);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState((prev) => ({...prev, [name]: value}));
    };

    const handleStartDate = (date: Date | null) => {
        setState((prev) => ({...prev, startDate: date}));
    };

    const handleDueDate = (date: Date | null) => {
        setState((prev) => ({...prev, dueDate: date}));
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (state.startDate && state.dueDate) {
            setRequired(false);
            const data: MilestoneSend = {
                ...state,
                startDate: state.startDate.toDateString(),
                dueDate: state.dueDate.toDateString(),
            };
            console.log(data);
        } else {
            setRequired(true);
        }
    };

    return (
        <Box sx={{width: '100%'}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Milestones" value="1"/>
                        <Tab label="New milestone" value="2"/>
                        <Tab label="Item Three" value="3"/>
                    </TabList>
                </Box>
                <TabPanel value='1'>here will be milestones</TabPanel>
                <TabPanel value='2'>
                    <Box component='form' onSubmit={submitFormHandler}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid container textAlign='center' spacing={3}>
                                <Grid item xs={12}>
                                    <TextField label='Title' name='title' autoComplete='new-title' value={state.title}
                                               onChange={inputChangeHandler}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <DatePicker label="Select start date" value={state.startDate}
                                                onChange={handleStartDate}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <DatePicker label="Select due date" value={state.dueDate} onChange={handleDueDate}/>
                                </Grid>
                                {required && (
                                    <Grid item xs={12}>
                                        <Alert severity='error'>Select dates</Alert>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <TextField
                                        multiline
                                        rows={4}
                                        label='Description...'
                                        name="description"
                                        autoComplete="new-description"
                                        value={state.description}
                                        onChange={inputChangeHandler}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LoadingButton variant='contained' type='submit'>Create milestone</LoadingButton>
                                </Grid>
                            </Grid>
                        </LocalizationProvider>
                    </Box>
                </TabPanel>
                <TabPanel value='3'>Item Three</TabPanel>
            </TabContext>
        </Box>
    );
};

export default ProjectMilestones;