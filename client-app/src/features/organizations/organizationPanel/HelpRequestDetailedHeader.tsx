import React from 'react'
import { HelpRequest } from '../../../app/models/HelpRequest'
import { Header, Item, Label, Segment, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
interface Props {
    helprequest: HelpRequest;
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
export default observer(function HelpRequestDetailedHeader({ helprequest }: Props) {
    const {helpRequestStore} = useStore()
    const{toggleHelpRequest,loading } = helpRequestStore
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/categoryImages/travel.jpg`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={helprequest.title}
                                    style={{ color: 'white' }}
                                />
                                <p>
                                    Created By <strong> <Link to={`/profiles/${helprequest.username}`}>{helprequest.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button
                    onClick={toggleHelpRequest}
                     color={helprequest.isActive ? 'red' : 'green'}
                    floated='left' loading={loading}
                    content={helprequest.isActive ? 'Cancel' : 'Take'} />
            </Segment>
        </Segment.Group>
    )
})
