import React from 'react'
import { Applications } from '../../../app/models/applications'
import { Button, Header, Icon, Item, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

interface Props {
    application: Applications
}
export default function ApplicationListItem({ application }: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={application.applicantImage || 'assets/user.png'} />
                        <Item.Content>
                            <Item.Header>{application.id}</Item.Header>
                            <Item.Description>
                                Created By{' '}
                                <Link to={`/profiles/${application.applicantUsername}`}>{application.applicantName}</Link>{' '}
                            </Item.Description>
                            <Item.Description>
                                <Button as={Link} to={`/profiles/${application.applicantUsername}`} content='View Profile' floated='right' color='teal'/>
                            </Item.Description>
                            <Item.Description>
                                <Icon name='envelope'/><span>{application.contactEmail}</span>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment clearing>
                <Header content='Cover Letter' size='tiny' color='teal' />
                <Icon name='info circle' />{application.coverLetter}
            </Segment>
            <Segment clearing>
                <Header content='Education Level' size='tiny' color='teal' />
                <Icon name='university' />{application.educationLevel}
            </Segment>
        </Segment.Group>
    )
}
