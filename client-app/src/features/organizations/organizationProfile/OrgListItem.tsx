import React from 'react'
import { OrgProfile } from '../../../app/models/organizationProfile'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { Segment, Label, Item, Icon, Button, Header } from 'semantic-ui-react'
import ActivityListItemAttendee from '../../activities/dashboard/ActivityListItemAttendee'
interface Props {
    profile : OrgProfile
}
export default function OrgListItem({profile}:Props) {
    function truncate(str: string | undefined) {
        if (str) {
          return str.length > 300 ? str.substring(0, 287) + '...' : str;
        }
      }
  return (
    
    <Segment.Group>
    <Segment>
        <Item.Group>
            <Item>
                <Item.Image size='tiny' circular src={profile.image || 'assets/user.png'} />
                <Item.Content>
                    <Item.Header as={Link} to={`/orgprofiles/${profile.username}`} >{profile.displayName}</Item.Header>
                    <Item.Description>{truncate(profile.description)} </Item.Description>
                    <Button as={Link} to={`/orgprofiles/${profile.username}`} color='teal' floated='right' content='View' />
                </Item.Content>
            </Item>
        </Item.Group>
    </Segment>
    <Segment>
        <Header size='small' content='Contact'/>
        <div>
            <Icon name='phone'/>{profile.phoneNumber}
        </div>
        <div>
            <Icon name='envelope'/>{profile.contactEmail}
        </div>
    </Segment>

</Segment.Group>
  )
}
