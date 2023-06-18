import React from 'react'
import { Tab } from 'semantic-ui-react'
import ProfilePhotos from './ProfilePhotos'
import { Profile } from '../../app/models/profile'
import { observer } from 'mobx-react-lite';
import ProfileAbout from './ProfileAbout';
import ProfileFollowings from './ProfileFollowings';
import { useStore } from '../../app/stores/store';
import ProfileHelpRequests from './ProfileHelpRequests';
import ProfileEvents from './ProfileEvents';

interface Props {
  profile: Profile;
}

export default observer(function ProfileContent({ profile }: Props) {
  const{profileStore} = useStore();
  const panes = [
    { menuItem: 'About', render: () => <ProfileAbout /> },
    { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: 'Events', render: () => <ProfileEvents /> },
    { menuItem: 'Followers', render: () => <ProfileFollowings /> },
    { menuItem: 'Following', render: () => <ProfileFollowings /> },
  ]
  if (profileStore.isCurrentUser) {
    panes.push({ menuItem: 'My Help Requests', render: () => <ProfileHelpRequests /> });
  }
  return (
    <Tab menu={{ fluid: true, vertical: true }} menuPosition='right' panes={panes} onTabChange={(e,data)=>profileStore.setActiveTab(data.activeIndex)} />
  )
})
