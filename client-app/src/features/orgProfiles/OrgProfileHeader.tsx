import { Card, Divider, Grid, Header, Icon, Item, Segment, Statistic,Image } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { OrgProfile } from '../../app/models/organizationProfile';

interface Props {
    profile: OrgProfile;

}

export default observer(function OrgProfileHeader({ profile }: Props) {
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={profile.displayName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Card >
                    <Card.Content>
                            <Card.Header><Icon name='phone square'/>Contact Us</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Card.Description>
                                <Icon name='phone'/>
                                {profile.phoneNumber}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content>
                            <Card.Description>
                                <Icon name='envelope'/>
                                {profile.contactEmail}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})
