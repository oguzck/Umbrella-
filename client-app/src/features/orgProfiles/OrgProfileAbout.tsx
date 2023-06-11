import { profile } from 'console'
import React, { useState } from 'react'
import { Tab, Grid, Header, Button } from 'semantic-ui-react'
import OrgProfileEditForm from './OrgProfileEditForm'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'

export default observer( function OrgProfileAbout() {
    const [editMode, setEditMode] = useState(false)
    const { orgProfileStore: { profile, isCurrentUser } } = useStore();
  return (
    <Tab.Pane>
    <Grid>
        <Grid.Column width='16'>
            <Header floated='left' icon='user' content={`About ${profile?.displayName}`} />
            {isCurrentUser && (
                <Button
                    floated='right'
                    basic
                    content={editMode ? 'Cancel' : 'Edit Profile'}
                    onClick={() => setEditMode(!editMode)}
                />
            )}
        </Grid.Column>
        <Grid.Column width='16'>
            {editMode ? <OrgProfileEditForm setEditMode={setEditMode} /> :
                <span style={{ whiteSpace: 'pre-wrap' }}>{profile?.description}</span>}
        </Grid.Column>
    </Grid>
</Tab.Pane>
  )
})
