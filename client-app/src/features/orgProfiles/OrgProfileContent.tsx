import React from 'react'
import { OrgProfile } from '../../app/models/organizationProfile';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Tab } from 'semantic-ui-react';
import ProfileHelpRequests from '../profiles/ProfileHelpRequests';


interface Props {
  profile: OrgProfile;
}

export default observer(function ProfileContent({ profile }: Props) {
  const{profileStore} = useStore();
  const panes = [
    { menuItem: 'About', render: () => <Tab.Pane>test</Tab.Pane>  },
    { menuItem: 'Photos', render: () => <Tab.Pane>test</Tab.Pane>  },
    { menuItem: 'Donate Us', render: () => <Tab.Pane>test</Tab.Pane>  },
    { menuItem: 'Job Adversitements', render: () =><Tab.Pane>test</Tab.Pane>   },

  ]
  if (profileStore.isCurrentUser) {
    panes.push({ menuItem: 'My Help Requests', render: () => <ProfileHelpRequests /> });
  }
  return (
    <Tab menu={{ fluid: true, vertical: true }} menuPosition='right' panes={panes} onTabChange={(e,data)=>profileStore.setActiveTab(data.activeIndex)} />
  )
})
