import React from 'react'
import Calendar from 'react-calendar'
import { Menu, Header } from 'semantic-ui-react'

export default function JobAdversitementFilters() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 28 }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All Adversitements' />
                <Menu.Item content="Paid Jobs" />
                <Menu.Item content="Voluntarily Jons" />
            </Menu>
            <Header />
        </>
    )
}
