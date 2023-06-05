import { format, parseISO } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Label, Item, Icon, Button } from 'semantic-ui-react'
import ActivityListItemAttendee from '../../activities/dashboard/ActivityListItemAttendee'
import { HelpRequest } from '../../../app/models/HelpRequest'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'

interface Props {
    helprequest: HelpRequest
}

export default observer(function HelpRequestListItem({ helprequest }: Props) {
    const formattedDate = format(new Date(helprequest.date), 'dd MMM yyyy h:mm aa');
    const { userStore, profileStore } = useStore();
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        {profileStore.isCurrentUser ? (
                            <Item.Content>
                                {helprequest.isActive &&
                                    <Label attached='top' color='green' style={{ textAlign: 'center' }} >Active : Related Organization:<Link to={`/orgprofiles/${helprequest.organizationUserName}`}>{helprequest.organizationName}</Link> </Label>
                                }

                                <Item.Header as={Link} to={`/helprequests/${helprequest.id}`} >{helprequest.title}</Item.Header>
                                <Item.Description>Created By <Link to={`/profiles/${helprequest.username}`}>{helprequest.displayName}</Link> </Item.Description>
                                <Item.Description>
                                    <span><Icon name='clock' /> {formattedDate}</span></Item.Description>
                            </Item.Content>
                        ) : (
                            <><Item.Image size='tiny' circular src={helprequest.image || 'assets/user.png'} /><Item.Content>
                                <Item.Header as={Link} to={`/helprequests/${helprequest.id}`}>{helprequest.title}</Item.Header>
                                <Item.Description>Created By <Link to={`/profiles/${helprequest.username}`}>{helprequest.displayName}</Link> </Item.Description>
                                <Item.Description>
                                    <span>
                                        <Icon name='clock' /> {formattedDate}
                                        <Button as={Link} to={`/helprequests/${helprequest.id}`} color='teal' floated='right' content='View' />
                                    </span></Item.Description>
                            </Item.Content></>
                        )}

                    </Item>
                </Item.Group>
            </Segment>
        </Segment.Group>
    )
})
