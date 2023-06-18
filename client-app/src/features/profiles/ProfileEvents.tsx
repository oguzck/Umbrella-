import React, { useEffect } from 'react'
import { Button, Card, Grid, Header, Icon, Item, Label, Segment, Tab, TabProps , Image } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile'
import ActivityListItem from '../activities/dashboard/ActivityListItem'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import ActivityListItemAttendee from '../activities/dashboard/ActivityListItemAttendee'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import { SyntheticEvent } from 'react-toastify/dist/utils'
import { UserActivity } from '../../app/models/userActivity'

const panes = [
    {menuItem : 'Future Events',pane:{key:'future'}},
    {menuItem : 'Past Events',pane:{key:'past'}},
    {menuItem : 'Hosting',pane:{key:'hosting'}},
]
export default observer( function ProfileEvents() {
    const {profileStore} = useStore()
    const {loadActivities,profile,loadingActivities,UserActivities} = profileStore
    useEffect(()=>{
        loadActivities();
    },[loadActivities,profile])

    const handleTabChange=(e:SyntheticEvent,data : TabProps)=>{
        loadActivities( panes[data.activeIndex as number].pane.key)
    }
    return (
        <Tab.Pane loading={loadingActivities}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar' content={'Activities'}/>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab panes={panes}
                     menu={{secondary:true,pointing : true}}
                     onTabChange={(e : any,data)=> handleTabChange(e,data)}
                     />
                     <br/>
                     <Card.Group itemsPerRow={4}>
                        {UserActivities.map((activity : UserActivity)=>(
                            <Card
                            as={Link}
                            to={`/activities/${activity.id}`}
                            key={activity.id}
                            >
                                <Image
                                src={`/assets/categoryImages/${activity.category}.jpg`}
                                style={{minHeight : 100,objectFit :'cover'}}
                                />
                                <Card.Content>
                                    <Card.Header textAlign='center'>{activity.title}</Card.Header>
                                    <Card.Meta>
                                        <div>{format(new Date(activity.date),'do LLL')}</div>
                                        <div>{format(new Date(activity.date),'h:mm a')}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                     </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})
