import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
interface Props {
  content : string
}
export default function NotFound({content}:Props) {
  return (
    <Segment placeholder>
        <Header icon>
            <Icon name = 'search'/>
            {content}
        </Header>
        <Segment.Inline>
            
        </Segment.Inline>
    </Segment>
  )
}
