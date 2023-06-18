import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import 'react-toastify/dist/ReactToastify.min.css'
import NavBar from './NavBar';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import HomePage from '../../features/home/homePage';
import { ToastContainer } from 'react-toastify';
import ModalContainer from '../common/modals/modalContainer';

function App() {
  const { commonStore, userStore,organizationStore } = useStore();
  const location = useLocation();
  const [userType, setUserType] = useState(false);
  useEffect(()=>{
    if (commonStore.token) {
      
      userStore.getUser().then(()=>organizationStore.getUser()).finally(()=>{ 
        commonStore.setAppLoaded()})
    }
    else{
      commonStore.setAppLoaded()
    }
  },[commonStore,userStore,organizationStore])


  if (!commonStore.appLoaded) {
    return <LoadingComponent content='Loading App...'/>
  }

  return (
    <>
    <ScrollRestoration/>
      <ModalContainer/>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === "/" ? <HomePage  /> : (
        <>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </>
      )}
    </>

  );
}

export default observer(App);
