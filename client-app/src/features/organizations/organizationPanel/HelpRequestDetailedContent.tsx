import React from 'react'
import { HelpRequest } from '../../../app/models/HelpRequest'
import { Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { format } from 'date-fns'
import { observer } from 'mobx-react-lite'
interface Props {
    helprequest: HelpRequest
}
export default observer( function HelpRequestDetailedContent({ helprequest }: Props) {
    const formattedDate = format(new Date(helprequest.date), 'dd MMM yyyy h:mm aa');
    return (
        <Segment.Group attached ='top'>

            <Segment >
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{helprequest.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        {formattedDate}
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment >

                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='envelope square' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        {helprequest.email}
                    </Grid.Column>
                </Grid>

            </Segment>
            <Segment >
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='phone square' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        {helprequest.contactNumber}
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment >
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='marker' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        {helprequest.adress}
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})
