import React, { SyntheticEvent, useState } from 'react'
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ActivityListItemAttendee from './ActivityListItemAttendee';

interface Props {
    activity: Activity
}

export default function ActivityListItem({ activity }: Props) {
    const { activityStore } = useStore();
    const { deleteActivity, loading } = activityStore
    const [target, setTarget] = useState('');
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    function truncate(str: string | undefined) {
        if (str) {
          return str.length > 80 ? str.substring(0, 77) + '...' : str;
        }
      }
    return (
        <Segment.Group>
            <Segment>
                {activity.isCanceled &&
                    <Label attached='top' color='red' content='Cancelled' style ={{textAlign : 'center'}}/>    
                }
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={activity.host?.image || 'assets/user.png'} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`} >{activity.title}</Item.Header>
                            <Item.Description>Hosted By <Link to={`/profiles/${activity.hostUsername}`}>{activity.host?.displayName}</Link> </Item.Description>
                            {activity.isHost &&  (
                                <Item.Description>
                                    <Label basic color='orange'>You are hosting this activity</Label>
                                </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label basic color='green'>You are going to this activity</Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                {activity.attendees.length>10}
                <ActivityListItemAttendee attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <div>
                    {truncate(activity.description)}
                </div>
                <Button as={Link} to={`/activities/${activity.id}`} color='teal' floated='right' content='View' />
            </Segment>
        </Segment.Group>
    )
}
