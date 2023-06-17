import React, { useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import { Organization } from '../../../app/models/organization';
import { OrgProfile } from '../../../app/models/organizationProfile';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import JobAdversitementListItem from '../../jobAdversitements/dashboard/JobAdversitementListItem';

interface Props {
    organization: OrgProfile;
}

export default observer( function OrgPanelJobs() {
    const { jobAdverStore, organizationStore } = useStore();
    const { listJobAdversitement, loading, jobAdversitements } = jobAdverStore;

    useEffect(() => {
        listJobAdversitement();
    }, [listJobAdversitement]);

    const filteredJobAdversitements = jobAdversitements.filter(
        (jobadver) => jobadver.organizationUserName === organizationStore.userOrg?.userName
    );
    if(loading) return <LoadingComponent content=''/>

    return (
        <>
            <Header content='Job Advertisements' color='teal' />
            {filteredJobAdversitements.map((jobadver) => (
                <JobAdversitementListItem jobadver={jobadver}/>
            ))}
        </>
    );
})
