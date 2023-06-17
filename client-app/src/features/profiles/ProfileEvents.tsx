import React from 'react'
import { Button, Grid, Header, Icon, Item, Label, Segment, Tab } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile'
import ActivityListItem from '../activities/dashboard/ActivityListItem'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import ActivityListItemAttendee from '../activities/dashboard/ActivityListItemAttendee'
interface Props {
    profile: Profile
}
export default function ProfileEvents({ profile }: Props) {
    function truncate(str: string | undefined) {
        if (str) {
          return str.length > 80 ? str.substring(0, 77) + '...' : str;
        }
      }
    return (
        <Tab.Pane>
            <Grid>
            <Header floated='left' icon='bookmark' content='My Events' />
                <Grid.Column width='16'>
                    {profile.activities.map((activity =>
                        <Segment.Group style={{}} >
                            <Segment>
                                {activity.isCanceled &&
                                    <Label attached='top' color='red' content='Cancelled' style={{ textAlign: 'center' }} />
                                }
                                <Item.Group>
                                    <Item>
                                        <Item.Content>
                                            <Item.Header as={Link} to={`/activities/${activity.id}`} >{activity.title}</Item.Header>
                                        </Item.Content>
                                    </Item>
                                </Item.Group>
                            </Segment>
                            <Segment>
                                <span>
                                    <Icon name='marker' /> {activity.venue}
                                </span>
                            </Segment>
                            <Segment secondary>
                                <span>
                                <Icon name='marker' /> Attendee Count :  {activity.attendees.length}
                                </span>
                            </Segment>
                            <Segment clearing>
                                <span>{truncate(activity.description)}</span>
                                <Button as={Link} to={`/activities/${activity.id}`} color='teal' floated='right' content='View' />
                            </Segment>
                        </Segment.Group>
                    ))}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}