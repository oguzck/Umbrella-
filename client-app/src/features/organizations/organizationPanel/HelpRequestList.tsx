import React, { Fragment, useEffect } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import ActivityListItem from '../../activities/dashboard/ActivityListItem';
import { useStore } from '../../../app/stores/store';
import HelpRequestListItem from './HelpRequestListItem';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import NotFound from '../../errors/NotFound';

export default observer(function HelpRequestList() {
    const { helpRequestStore } = useStore();
    const { listHelpRequest, helpRequests, loading } = helpRequestStore;
    const filteredHelpRequests = helpRequests.filter(
        (helpRequest) => !helpRequest.isActive
    );
    useEffect(() => {
        listHelpRequest();
    }, [listHelpRequest]);

    if (loading) return <LoadingComponent content='Loading Help Requests' />;

    return (
        <Segment style={{ marginTop: '20px', backgroundColor: '#F8F8F8' }}>
            <Header as="h2" textAlign="center" style={{ color: '#1F79A3' }}>
                Help Requests
            </Header>
            {filteredHelpRequests.length ? (
                filteredHelpRequests.map((helpRequest) => (
                    <HelpRequestListItem helprequest={helpRequest} key={helpRequest.id} />
                ))
            ) : (
                <NotFound content='There are no help requests at the moment' />
            )}
        </Segment>
    );
});
