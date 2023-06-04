import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Segment,Image, Item, Header, Button, Grid, Icon } from 'semantic-ui-react';

export default observer( function JobAdversitementDetails() {
    const { id } = useParams();
    const { jobAdverStore } = useStore();
    const { loadJobAdversitement, selectedJobAdversitement , loadingInitial ,clearSelectedJobAdversitement } = jobAdverStore
    useEffect(() => {
        if (id) loadJobAdversitement(id);
        else
        {return ()=>clearSelectedJobAdversitement();}
    }, [id,loadJobAdversitement,clearSelectedJobAdversitement])
    const activityImageStyle = {
        filter: 'brightness(30%)'
    };
    
    const activityImageTextStyle = {
        position: 'absolute',
        bottom: '5%',
        left: '5%',
        width: '100%',
        height: 'auto',
        color: 'white'
    };
    if ( loadingInitial  || !selectedJobAdversitement) return<LoadingComponent content={''}/>
  return (
    <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/helprequest2.png`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={selectedJobAdversitement.title}
                                    style={{ color: 'white'  }}
                                />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing >
                <Button as={Link} to={`/jobadversitements/${selectedJobAdversitement.id}/apply`} positive content='Apply'/>
            </Segment>
            <Segment  >
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='building' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{selectedJobAdversitement.organizationName}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment  >
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='marker' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{selectedJobAdversitement.city}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment  >
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{selectedJobAdversitement.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment  >
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='tasks' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{selectedJobAdversitement.skills}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
  )
})
