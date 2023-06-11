import { profile } from 'console'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Tab, Grid, Header, Button } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'
import OrgProfileEditForm from './OrgProfileEditForm'
import OrgProfileDonationEditForm from './OrgProfileDonationEditForm'

export default observer(function OrgProfilesDonation() {
  const { orgProfileStore } = useStore();
  const { isCurrentUser, profile } = orgProfileStore
  const [editMode, setEditMode] = useState(false)

  return (
    <Tab.Pane>
      <Grid centered>
        <Grid.Column width='16'>
          <Header floated='left' icon='heart' content='Donate Us' />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={editMode ? 'Cancel' : 'Edit Donation Info'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width='16' textAlign='center'>
          {editMode ? (
            <OrgProfileDonationEditForm setEditMode={setEditMode} />
          ) : (
            <div>
              <Header as='h2' style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                {profile?.donationIban}
              </Header>
              <Header as='h3' style={{ whiteSpace: 'pre-wrap', fontWeight: 'bold', marginTop: '30px' }}>
                {profile?.donationDescription}
              </Header>
            </div>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
})
