import React, {SyntheticEvent} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from '@mui/material';
import {Milestone} from '../../../types';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useAppSelector} from '../../../app/hooks';
import {selectIssuesByStatus} from '../../issues/issuesSlice';
import IssueItem from '../../issues/components/IssueItem';

interface Props {
    item: Milestone;
    expended: boolean | undefined;
    handleChange: (milestoneId: string, projectId: string) => (event: SyntheticEvent, isExpanded: boolean) => void;
}

const MilestoneItem: React.FC<Props> = ({item, expended, handleChange}) => {
    const issues = useAppSelector(selectIssuesByStatus);
    return (
        <Accordion expanded={expended} onChange={handleChange(item._id, item.project)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={`${item._id}bh-content`}
                id={`${item._id}bh-content`}
            >
                <Grid item xs={12}>
                    <Grid container flexDirection='column'>
                        <Grid item xs>
                            <Typography textTransform='uppercase' fontWeight='bolder'>{item.title}</Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant='subtitle2' color='grey'>{item.startDate} - {item.dueDate}</Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant='subtitle2'>{item.description}</Typography>
                        </Grid>
                    </Grid>
                    <Divider/>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                {issues.length > 0 ? issues.map(issue => (
                    <IssueItem key={issue._id} item={issue}/>
                )) : <Typography>There are no closed issues</Typography>}
            </AccordionDetails>
        </Accordion>
    );
};

export default MilestoneItem;