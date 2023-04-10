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

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  const location = useLocation();

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
      {location.pathname === "/" ? <HomePage /> : (
        <>
          <NavBar/>
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </>
      )}
    </>

  );
}

export default observer(App);
