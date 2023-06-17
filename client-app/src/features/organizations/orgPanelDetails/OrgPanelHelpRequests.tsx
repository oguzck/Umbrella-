import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Header } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import HelpRequestListItem from '../organizationPanel/HelpRequestListItem';
import NotFound from '../../errors/NotFound';

export default observer( function OrgPanelHelpRequests() {
  const { helpRequestStore ,organizationStore } = useStore();
    const { listHelpRequest, helpRequests, loading } = helpRequestStore;
    const filteredHelpRequests = helpRequests.filter(
        (helpRequest) => helpRequest.organizationUserName==organizationStore.userOrg?.userName
    );
    useEffect(() => {
        listHelpRequest();
    }, [listHelpRequest]);
    if (loading) return <LoadingComponent content='' />;
  return (
    <>
    <Header content='Help Requests' color='teal' />
    {filteredHelpRequests.length ? (
                filteredHelpRequests.map((helpRequest) => (
                    <HelpRequestListItem helprequest={helpRequest} key={helpRequest.id} />
                ))
            ) : (
                <NotFound content='There are no help requests at the moment' />
            )}
    </>
  )
})
