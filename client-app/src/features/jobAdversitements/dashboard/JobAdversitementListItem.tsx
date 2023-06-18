import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import ActivityListItemAttendee from '../../activities/dashboard/ActivityListItemAttendee'
import { JobAdversitements } from '../../../app/models/jobAdversitement'
import { format } from 'date-fns'

interface Props {
    jobadver : JobAdversitements
}

export default function JobAdversitementListItem({jobadver}:Props) {
    const formattedDate = format(new Date(jobadver.date), 'dd MMM yyyy');
  return (
    <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                    <Item.Image size='tiny' circular src={jobadver.organizationImage || '/assets/user.png'} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/jobadversitements/${jobadver.id}`} >{jobadver.title}</Item.Header>
                            <Item.Description> <Link to={`/orgprofiles/${jobadver.organizationUserName}`}>{jobadver.organizationName}</Link> </Item.Description>
                            {jobadver.isPaid &&  (
                                <Item.Description>
                                     <Label basic color='green'>Paid Job</Label>
                                </Item.Description>
                            )}
                            {!jobadver.isPaid && (
                                <Item.Description>
                                    <Label basic color='orange'>Voluntarily Job</Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> <span>{formattedDate} </span> 
                    <br></br> 
                    <Icon name='marker' /><span>{jobadver.city}</span>
                </span>
            </Segment>
            <Segment clearing>
                <span style={{color:'teal'}}> Number Of Applications {jobadver.applications.length}</span>
                <Button as={Link} to={`/jobadversitements/${jobadver.id}`} color='teal' floated='right' content='View' />
            </Segment>
        </Segment.Group>
  )
}
