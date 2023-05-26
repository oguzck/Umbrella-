import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';
import OrgLoginForm from '../organizations/organizationForms/OrgLoginForm';
import LoadingComponent from '../../app/layout/LoadingComponent';



export default observer(function HomePage() {
  const { userStore, modalStore,organizationStore } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulating an asynchronous operation (e.g., fetching data) with a timeout
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cleanup the timeout if the component unmounts before the timeout is finished
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading){return (<LoadingComponent content='Loading...'/>)}
  return (

    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo3.png' alt='logo' style={{ marginBottom: 12 }} />
          Umbrella
        </Header>
        {(userStore.isLoggedIn || organizationStore.isLoggedIn) ? (
          <>
          {(userStore.user?.isUser) ?(
            <><Header as='h2' inverted content='Welcome to Umbrella' /><Button as={Link} to='/activities' size='huge' inverted> Go To Activities </Button></>
          ):(<><Header as='h2' inverted content='Welcome to Umbrella' /><Button as={Link} to='/organizationPanel' size='huge' inverted> Go to panel </Button></>)}
            
          </>
        ) : (
          <>
            <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted> Login </Button>
            <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size='huge' inverted> Register </Button>
            <Button onClick={() => modalStore.openModal(<OrgLoginForm/>)} size='huge' inverted> Log in as organization </Button>
          </>

        )}
      </Container>
    </Segment>
  )
})
