import React from 'react';
import {Project} from '../../../types';
import {Box, Divider, Grid, Typography} from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

interface Props {
    project: Project;
}

const ProjectReadMe: React.FC<Props> = ({project}) => {
    return (
        <Box mt={2} border={1} p={2} borderRadius={2} borderColor='lightgray'>
            <Grid container alignItems='center'>
                <TextSnippetIcon/>
                <Typography>Readme</Typography>
            </Grid>
            <Grid container p={3} spacing={2} flexDirection='column'>
                <Grid item><Typography fontWeight='bold'>{project.name}</Typography><Divider/></Grid>
                <Grid item><Typography fontWeight='bold'>Getting started</Typography><Divider/></Grid>
                <Grid item>
                    <Typography>To make it easy for you to get started with GitLab, here's a list of recommended next
                        steps.
                        Already a pro? Just edit this README.md and make it your own. Want to make it easy? Use the
                        template at the bottom!</Typography>
                </Grid>
                <Grid item><Typography fontWeight='bold'>Add your files</Typography><Divider/></Grid>
                <Grid item>
                    <Typography pl={1} color='blue'>Create or upload files</Typography>
                    <Typography pl={1} color='blue'> Add files using the command line or push an existing Git repository
                        with the following
                        command:</Typography>
                </Grid>
                <Grid item>
                    <Box border={1} p={1} borderColor='lightgrey'>
                        <Typography>cd existing_repo</Typography>
                        <Typography>{`https://issue-tracker.com/${project?.manager.displayName.toLocaleLowerCase()}/${project?.name.toLocaleLowerCase()}.git`}</Typography>
                        <Typography>git branch -M main</Typography>
                        <Typography>git push -uf origin main</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Integrate with your tools</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography pl={1} color='blue'>Set up project integrations</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Collaborate with your team</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography pl={1} color='blue'>Invite team members and collaborators</Typography>
                    <Typography pl={1} color='blue'>Create a new merge request</Typography>
                    <Typography pl={1} color='blue'>Automatically close issues from merge requests</Typography>
                    <Typography pl={1} color='blue'>Enable merge request approvals</Typography>
                    <Typography pl={1} color='blue'>Automatically merge when pipeline succeeds</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Test and Deploy</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>Use the built-in continuous integration in GitLab.</Typography>
                </Grid>
                <Grid item>
                    <Typography pl={1} color='blue'>Get started with IssueTracker CI/CD</Typography>
                    <Typography pl={1} color='blue'>Analyze your code for known vulnerabilities with Static
                        Application Security Testing(SAST)</Typography>
                    <Typography pl={1} color='blue'> Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto
                        Deploy</Typography>
                    <Typography pl={1} color='blue'>Use pull-based deployments for improved Kubernetes
                        management</Typography>
                    <Typography pl={1} pb={2} color='blue'>Set up protected environments</Typography>
                    <Divider/>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Editing this README</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>When you're ready to make this README your own, just edit this file and use the
                        handy template below (or feel free to structure it however you want - this is just a
                        starting point!). Thank you to makeareadme.com for this template.</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Suggestions for a good README</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>Every project is different, so consider which of these sections apply to yours. The
                        sections used in the template are suggestions for most open source projects. Also keep in
                        mind that while a README can be too long and detailed, too long is better than too short. If
                        you think your README is too long, consider utilizing another form of documentation rather
                        than cutting out information.</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Name</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>Choose a self-explaining name for your project.</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Description</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>Let people know what your project can do specifically. Provide context and add a
                        link to any reference visitors might be unfamiliar with. A list of Features or a Background
                        subsection can also be added here. If there are alternatives to your project, this is a good
                        place to list differentiating factors.</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Badges</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>On some READMEs, you may see small images that convey metadata, such as whether or
                        not all the tests are passing for the project. You can use Shields to add some to your
                        README. Many services also have instructions for adding a badge.</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Visuals</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>Depending on what you are making, it can be a good idea to include screenshots or
                        even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can
                        help, but check out Asciinema for a more sophisticated method.</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Installation</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>Within a particular ecosystem, there may be a common way of installing things, such
                        as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading
                        your README is a novice and would like more guidance. Listing specific steps helps remove
                        ambiguity and gets people to using your project as quickly as possible. If it only runs in a
                        specific context like a particular programming language version or operating system or has
                        dependencies that have to be installed manually, also add a Requirements
                        subsection.</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Usage</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>Use examples liberally, and show the expected output if you can. It's helpful to
                        have inline the smallest example of usage that you can demonstrate, while providing links to
                        more sophisticated examples if they are too long to reasonably include in the
                        README.</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Support</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>Tell people where they can go to for help. It can be any combination of an issue
                        tracker, a chat room, an email address, etc.</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Roadmap</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>If you have ideas for releases in the future, it is a good idea to list them in the
                        README.</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Contributing</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>State if you are open to contributions and what your requirements are for accepting
                        them.
                        For people who want to make changes to your project, it's helpful to have some documentation
                        on how to get started. Perhaps there is a script that they should run or some environment
                        variables that they need to set. Make these steps explicit. These instructions could also be
                        useful to your future self.
                        You can also document commands to lint the code or run tests. These steps help to ensure
                        high code quality and reduce the likelihood that the changes inadvertently break something.
                        Having instructions for running tests is especially helpful if it requires external setup,
                        such as starting a Selenium server for testing in a browser.</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Authors and acknowledgment</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>Show your appreciation to those who have contributed to the project.</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>License</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>For open source projects, say how it is licensed.</Typography>
                </Grid>
                <Grid item>
                    <Typography fontWeight='bold'>Project status</Typography><Divider/>
                </Grid>
                <Grid item>
                    <Typography>If you have run out of energy or time for your project, put a note at the top of the
                        README saying that development has slowed down or stopped completely. Someone may choose to
                        fork your project or volunteer to step in as a maintainer or owner, allowing your project to
                        keep going. You can also make an explicit request for maintainers.</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProjectReadMe;