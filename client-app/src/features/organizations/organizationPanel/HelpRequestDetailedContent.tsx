import React from 'react'
import { HelpRequest } from '../../../app/models/HelpRequest'
import { Grid, Icon, Segment } from 'semantic-ui-react'
import { format } from 'date-fns'
interface Props{
    helprequest : HelpRequest
}
export default function HelpRequestDetailedContent({helprequest}:Props) {
    const formattedDate = format(new Date(helprequest.date), 'dd MMM yyyy h:mm aa');
  return (
    <Segment.Group>
    <Segment attached='top'>
        <Grid>
            <Grid.Column width={1}>
                <Icon size='large' color='teal' name='info'/>
            </Grid.Column>
            <Grid.Column width={15}>
                <p>{helprequest.description}</p>
            </Grid.Column>
        </Grid>
    </Segment>
    <Segment attached>
        <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
                <Icon name='calendar' size='large' color='teal'/>
            </Grid.Column>
            <Grid.Column width={15}>
    <span>
    {formattedDate}
    </span>
            </Grid.Column>
        </Grid>
    </Segment>
    <Segment attached='top'>
        <Grid>
            <Grid.Column width={1}>
                <Icon size='large' color='teal' name='info'/>
            </Grid.Column>
            <Grid.Column width={15}>
                <p>{helprequest.email}</p>
            </Grid.Column>
        </Grid>
    </Segment>

</Segment.Group>
  )
}
