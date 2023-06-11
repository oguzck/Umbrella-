import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useStore } from '../../../app/stores/store'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Grid, Header, Input } from 'semantic-ui-react';
import OrgListItem from './OrgListItem';
import { OrgProfile } from '../../../app/models/organizationProfile';

export default observer(function OrgList() {
  const { orgProfileStore } = useStore();
  const { listProfiles, loading, profileList } = orgProfileStore
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState<OrgProfile[]>([]);

  useEffect(() => {
    listProfiles();
  }, [listProfiles])

  useEffect(() => {
    if (searchQuery) {
      const filtered = profileList.filter((profile) =>
        profile.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProfiles(filtered);
    } else {
      setFilteredProfiles(profileList);
    }
  }, [searchQuery, profileList]);
  if (loading) return (<LoadingComponent content='Loading organizations...' />)
  return (
    <>
    
    <Header content='Organizations' color='teal'/>
    <Input
        style = {{outerHeight :'30px'}}
        icon='search'
        placeholder='Search For An Organization'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredProfiles.map(profile => (
        <OrgListItem profile={profile}/>
      ))}
    </>
  )
})
