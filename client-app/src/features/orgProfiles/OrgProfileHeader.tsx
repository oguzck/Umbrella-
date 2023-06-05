import { Divider, Grid, Header, Item, Segment, Statistic } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { OrgProfile } from '../../app/models/organizationProfile';

interface Props{
    profile : OrgProfile;

}

export default observer( function OrgProfileHeader({profile}:Props) {
  return (
    <Segment>
        <Grid>
            <Grid.Column width={12}>
                <Item.Group>
                    <Item>
                        <Item.Image avatar size ='small' src={ profile.image || '/assets/user.png'}/>
                        <Item.Content verticalAlign='middle'>
                            <Header as ='h1' content = {profile.displayName} />
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Grid.Column>
            <Grid.Column width={4}>
                <Statistic.Group widths={2}>

                </Statistic.Group>
                <Divider/>
            </Grid.Column>
        </Grid>
    </Segment>
  )
})
