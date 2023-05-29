import { profile } from 'console'
import React from 'react'
import { Tab, Grid, Header } from 'semantic-ui-react'
import ProfileEditForm from './ProfileEditForm'
import { Profile } from '../../app/models/profile'
import HelpRequestListItem from '../organizations/organizationPanel/HelpRequestListItem'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'

export default observer(function ProfileHelpRequests() {
    const {profileStore}=useStore()
    const {profile ,loadingHelpRequests} = profileStore
    
  return (
    <Tab.Pane loading={loadingHelpRequests}>
    <Grid>
        <Grid.Column width='16'>
            <Header floated='left' icon='user' content={`My Help Requests`} />
        </Grid.Column>
        <Grid.Column width='16'>
            {profile!.helpRequests.map((helprequest=>
                 <HelpRequestListItem key={helprequest.id} helprequest={helprequest}/>
            ))}
        </Grid.Column>
    </Grid>
</Tab.Pane>
  )
})
