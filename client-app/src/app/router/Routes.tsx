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
import OrganizationPanel from "../../features/organizations/organizationPanel/OrganizationPanel";
import HelpRequestDashboard from "../../features/organizations/organizationPanel/HelpRequestDashboard";
import HelpRequestDetailedPage from "../../features/organizations/organizationPanel/HelpRequestDetailedPage";

export const routes : RouteObject[] = [
    {
        path : '/',
        element : <App/>,
        children : [
            {path :'activities',element : <ActivityDashboard/>},
            {path :'helprequests',element : <HelpRequestDashboard/>},
            {path :'helprequests/:id',element : <HelpRequestDetailedPage/>},
            {path :'organizationPanel',element : <OrganizationPanel/>},
            {path :'activities/:id',element : <ActivityDetails/>},
            {path :'createActivity',element : <ActivityForm key='create'/>},
            {path :'createHelpRequest',element : <HelpRequestForm key='create'/>},
            {path :'manage/:id',element : <ActivityForm key='manage'/>},
            {path :'profiles/:username',element : <ProfilePage/>},
            {path :'login',element : <LoginForm/>},
            {path :'errors',element : <TestErrors/>},
            {path :'not-found',element : <NotFound/>},
            {path :'server-error',element : <ServerError/>},
            {path :'*',element : <Navigate replace to='/not-found'/>},
        ]
    }
]

export const router = createBrowserRouter(routes);