import { format, parseISO } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Label, Item, Icon, Button } from 'semantic-ui-react'
import ActivityListItemAttendee from '../../activities/dashboard/ActivityListItemAttendee'
import { HelpRequest } from '../../../app/models/HelpRequest'

interface Props {
    helprequest: HelpRequest
}

export default function HelpRequestListItem({ helprequest }: Props) {
    const formattedDate = format(new Date(helprequest.date), 'dd MMM yyyy h:mm aa');

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={helprequest.image || 'assets/user.png'} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/helprequests/${helprequest.id}`} >{helprequest.title}</Item.Header>
                            <Item.Description>Created By <Link to={`/profiles/${helprequest.username}`}>{helprequest.displayName}</Link> </Item.Description>
                            <Item.Description>
                                <span>
                                    <Icon name='clock' /> {formattedDate}
                                    <Button as={Link} to={`/helprequests/${helprequest.id}`} color='teal' floated='right' content='View' />
                                </span></Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Segment.Group>
    )
}
