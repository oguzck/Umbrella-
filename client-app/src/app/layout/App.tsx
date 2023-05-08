import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import 'react-toastify/dist/ReactToastify.min.css'
import NavBar from './NavBar';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import HomePage from '../../features/home/homePage';
import { ToastContainer } from 'react-toastify';
import ModalContainer from '../common/modals/modalContainer';

function App() {
  const { commonStore, userStore } = useStore();
  const location = useLocation();
  useEffect(()=>{
    if (commonStore.token) {
      userStore.getUser().finally(()=> commonStore.setAppLoaded())
    }else{
      commonStore.setAppLoaded()
    }
  },[commonStore,userStore])

  if (!commonStore.appLoaded) {
    return <LoadingComponent content='Loading App...'/>
  }

  return (
    <>
      <ModalContainer/>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === "/" ? <HomePage /> : (
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
