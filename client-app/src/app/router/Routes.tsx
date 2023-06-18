import { RouteObject } from "react-router";
import { Navigate, createBrowserRouter } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import HomePage from "../../features/home/homePage";
import App from "../layout/App";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import ProfilePage from "../../features/profiles/ProfilePage";
import HelpRequestForm from "../../features/helpRequests/HelpRequestForm";
import OrganizationPanel from "../../features/organizations/orgPanelDetails/OrganizationPanel";
import HelpRequestDashboard from "../../features/organizations/organizationPanel/HelpRequestDashboard";
import HelpRequestDetailedPage from "../../features/organizations/organizationPanel/HelpRequestDetailedPage";
import JobAdversitementForm from "../../features/jobAdversitements/form/JobAdversitementForm";
import JobAdversitementsDashboard from "../../features/jobAdversitements/dashboard/JobAdversitementsDashboard";
import JobAdversitementDetails from "../../features/jobAdversitements/details/jobAdversitementDetails";
import ApplicationForm from "../../features/jobAdversitements/form/ApplicationForm";
import OrgProfilePage from "../../features/orgProfiles/OrgProfilePage";
import OrgList from "../../features/organizations/organizationProfile/OrgList";
import ApplicationList from "../../features/jobAdversitements/applications/ApplicationList";
import RequireAuth from "./RequireAuth";
import RegisterSuccess from "../../features/users/RegisterSuccess";
import ConfirmEmail from "../../features/users/ConfirmEmail";

export const routes : RouteObject[] = [
    {
        path : '/',
        element : <App/>,
        children : [
            {element:<RequireAuth/> , children: [
                {path :'activities',element : <ActivityDashboard/>},
                {path :'jobAdversitements/:id/apply',element : <ApplicationForm/>},
                {path :'organizations',element : <OrgList/>},
                {path :'activities/:id',element : <ActivityDetails/>},
                {path :'createActivity',element : <ActivityForm key='create'/>},
                {path :'createHelpRequest',element : <HelpRequestForm key='create'/>},
                {path :'orgprofiles/:username',element : <OrgProfilePage/>},
                {path :'manage/:id',element : <ActivityForm key='manage'/>},
                
            ]},
            {path :'profiles/:username',element : <ProfilePage/>},
            {path :'helprequests/:id',element : <HelpRequestDetailedPage/>},
            {path :'jobAdversitements',element : <JobAdversitementsDashboard/>},
            {path :'jobAdversitements/:id',element : <JobAdversitementDetails/>},
            {path :'jobAdversitements/:id/applications',element : <ApplicationList/>},
            {path :'helprequests',element : <HelpRequestDashboard/>},
            {path :'organizationPanel',element : <OrganizationPanel/>},
            {path :'createJobadversitement',element : <JobAdversitementForm/>},
            {path :'login',element : <LoginForm/>},
            {path :'errors',element : <TestErrors/>},
            {path :'account/registerSuccess',element : <RegisterSuccess/>},
            {path :'account/verifyEmail',element : <ConfirmEmail/>},
            {path :'not-found',element : <NotFound content="We could not found what you are looking for"/>},
            {path :'server-error',element : <ServerError/>},
            {path :'*',element : <Navigate replace to='/not-found'/>},
        ]
    }
]

export const router = createBrowserRouter(routes);