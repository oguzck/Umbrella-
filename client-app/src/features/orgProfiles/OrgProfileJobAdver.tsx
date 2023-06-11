import React from 'react'
import { Tab, Grid, Header } from 'semantic-ui-react'
import HelpRequestListItem from '../organizations/organizationPanel/HelpRequestListItem'
import { OrgProfile } from '../../app/models/organizationProfile'
import JobAdversitementListItem from '../jobAdversitements/dashboard/JobAdversitementListItem'
interface Props {
    profile : OrgProfile
}
export default function OrgProfileJobAdver({profile}:Props) {
  return (
    <Tab.Pane >
    <Grid>
        <Grid.Column width='16'>
            <Header floated='left' icon='briefcase' content={`Job Adversitements`} />
        </Grid.Column>
        <Grid.Column width='16'>
            {profile.jobAdversitements.map((job=>
                 <JobAdversitementListItem jobadver={job}/>
            ))}
        </Grid.Column>
    </Grid>
</Tab.Pane>
  )
}
