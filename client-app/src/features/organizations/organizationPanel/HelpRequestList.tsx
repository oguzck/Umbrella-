import React, { Fragment, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import ActivityListItem from '../../activities/dashboard/ActivityListItem';
import { useStore } from '../../../app/stores/store';
import HelpRequestListItem from './HelpRequestListItem';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import NotFound from '../../errors/NotFound';

export default observer(function HelpRequestList() {
    const { helpRequestStore } = useStore();
    const { listHelpRequest, helpRequests, loading } = helpRequestStore;
    const filteredHelpRequests = helpRequests.filter(helprequest => !helprequest.isActive)
    useEffect(() => {
        listHelpRequest();
    }, [listHelpRequest]);
    
    if (loading) return <LoadingComponent content='Loading Help Requests' />;

    return (
        <>
        <Header content='Help Request Pool' />
        {filteredHelpRequests.length ? (
            filteredHelpRequests 
                .map(helpRequest => (
                    <HelpRequestListItem helprequest={helpRequest} key={helpRequest.id} />
                ))
        ) : (
            <NotFound content='There is help request at the moment' />
        )}
    </>
    );
})    
