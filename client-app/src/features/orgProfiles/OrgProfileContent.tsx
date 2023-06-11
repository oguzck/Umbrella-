import React from 'react'
import { OrgProfile } from '../../app/models/organizationProfile';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Tab } from 'semantic-ui-react';
import ProfileHelpRequests from '../profiles/ProfileHelpRequests';
import OrgProfilePhotos from './OrgProfilePhotos';
import OrgProfileJobAdver from './OrgProfileJobAdver';
import OrgProfileAbout from './OrgProfileAbout';
import OrgProfilesDonation from './OrgProfilesDonation';


interface Props {
  profile: OrgProfile;
}

export default observer(function ProfileContent({ profile }: Props) {
  const{orgProfileStore} = useStore();
  const panes = [
    { menuItem: 'About', render: () => <OrgProfileAbout/>  },
    { menuItem: 'Photos', render: () => <OrgProfilePhotos profile={profile}/>  },
    { menuItem: 'Donate Us', render: () => <OrgProfilesDonation/>  },
    { menuItem: 'Job Adversitements', render: () =><OrgProfileJobAdver profile={profile}/>   },

  ]
  return (
    <Tab menu={{ fluid: true, vertical: true }} menuPosition='right' panes={panes} onTabChange={(e,data)=>orgProfileStore.setActiveTab(data.activeIndex)} />
  )
})
