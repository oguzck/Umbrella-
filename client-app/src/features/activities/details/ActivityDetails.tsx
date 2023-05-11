import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSideBar from './ActivityDetailedSideBar';


export default observer (function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity , loadActivity,loadingInital} = activityStore
    const {id} = useParams();

    useEffect(() =>{
        if(id) loadActivity(id);
    },[id,loadActivity])

    if ( loadingInital  || !activity) return<LoadingComponent content={''}/>
    return (
        <Grid>
            <Grid.Column width = {10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSideBar activity={activity}/>
            </Grid.Column>
        </Grid>
    )
})
