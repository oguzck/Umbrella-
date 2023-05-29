import React, { Fragment, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import ActivityListItem from '../../activities/dashboard/ActivityListItem';
import { useStore } from '../../../app/stores/store';
import HelpRequestListItem from './HelpRequestListItem';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default observer(function HelpRequestList() {
    const { helpRequestStore } = useStore();
    const { listHelpRequest, helpRequests, loading } = helpRequestStore;
    useEffect(() => {
        listHelpRequest();
    }, [listHelpRequest]);

    if (loading) return <LoadingComponent content='Loading Help Requests' />;

    return (
        <>
        <Header content='Help Request Pool'/>
            {helpRequests
                .filter(helprequest => !helprequest.isActive)
                .map(helprequest => (
                    <HelpRequestListItem key={helprequest.id} helprequest={helprequest} />
                ))}
        </>
    );
});
