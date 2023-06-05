import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, DropdownItem, Image, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';



export default observer(function NavBar() {
    const { userStore: { user, logout }, organizationStore: { logoutOrg, userOrg } } = useStore();
    return (

        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src='/assets/logo3.png' alt="logo" style={{ marginRight: '10px' }}></img>
                    Umbrella
                </Menu.Item>
                {user?.isUser ? (
                    <>
                        <Menu.Item as={NavLink} to='/activities' name='Activities' />
                        <Menu.Item as={NavLink} to='/jobadversitements' name='Job Adversitements' />
                        <Menu.Item>
                            <Button as={NavLink} to='createActivity' positive content='Create Activity' />
                        </Menu.Item>
                        <Menu.Item>
                            <Button as={NavLink} to='createHelpRequest' positive content='Need Help ?' />
                        </Menu.Item>
                        <Menu.Item position='right'>
                            <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                            <Dropdown pointing='top left' text={user?.displayName}>
                                <Dropdown.Menu>
                                    <DropdownItem as={Link} to={`/profiles/${user?.userName}`} text='My Profile' icon='user' />
                                    <DropdownItem onClick={logout} text='Logout' icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    </>
                ) : (
                    <>
                        <Menu.Item as={NavLink} to='/organizationPanel' name='Organization Panel' />
                        <Menu.Item as={NavLink} to='/helprequests' name='Help Requests' />
                        <Menu.Item>
                            <Button as={NavLink} to='createJobadversitement' positive content='Create Job Adversitement' />
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/errors' name='Errors' /><Menu.Item position='right'>
                            <Image src={userOrg?.image || '/assets/user.png'} avatar spaced='right' />
                            <Dropdown pointing='top left' text={userOrg?.displayName}>
                                <Dropdown.Menu>
                                    <DropdownItem as={Link} to={`/orgprofiles/${user?.userName}`} text='My Profile' icon='user' />
                                    <DropdownItem onClick={logoutOrg} text='Logout' icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    </>
                )


                }
            </Container>
        </Menu>
    )
})
