import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Segment, Image, Item, Header, Button, Grid, Icon } from 'semantic-ui-react';
import { router } from '../../../app/router/Routes';

export default observer(function JobAdversitementDetails() {
    const { id } = useParams();
    const { jobAdverStore } = useStore();
    const { deleteJobAdver, loadJobAdversitement, selectedJobAdversitement, loadingInitial, clearSelectedJobAdversitement } = jobAdverStore
    const { userStore } = useStore();
    useEffect(() => {
        if (id) loadJobAdversitement(id);
        else { return () => clearSelectedJobAdversitement(); }
    }, [id, loadJobAdversitement, clearSelectedJobAdversitement])
    const deleteHandler = () => {
        deleteJobAdver(id!)
        router.navigate(`/organizationPanel`)
    }
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
    if (loadingInitial || !selectedJobAdversitement) return <LoadingComponent content={''} />
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
                                    style={{ color: 'white' }}
                                />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            {userStore.user?.isUser ?
                (
                    <Segment clearing >
                        <Button as={Link} to={`/jobadversitements/${selectedJobAdversitement.id}/apply`} positive content='Apply' />
                    </Segment>

                ) : (
                    <Segment clearing >
                        <Button onClick={deleteHandler} negative content='Delete' />
                        {selectedJobAdversitement.applications.length < 1 ? (
                            <Button as={Link} disabled to={`/jobadversitements/${selectedJobAdversitement.id}/applications`} floated='right' positive content='View Applications' />

                        ) : (
                            <Button as={Link} to={`/jobadversitements/${selectedJobAdversitement.id}/applications`} floated='right' positive content='View Applications' />

                        )}
                    </Segment>
                )
            }

            <Segment  >
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='building' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p><Link to={`/orgprofiles/${selectedJobAdversitement.organizationUserName}`}>{selectedJobAdversitement.organizationName}</Link></p>
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
