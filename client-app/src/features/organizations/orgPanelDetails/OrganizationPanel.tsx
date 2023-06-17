import React, { useState, useEffect } from 'react';
import HelpRequestList from '../organizationPanel/HelpRequestList';
import OrgPanelJobs from './OrgPanelJobs';
import OrgPanelHelpRequests from './OrgPanelHelpRequests';
import { Tab, Segment, Header, Dimmer, Loader } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function OrganizationPanel() {
  const [loading, setLoading] = useState(true);
  const { organizationStore } = useStore();

  useEffect(() => {
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const panes = [
    {
      menuItem: { content: 'Jobs', color: 'teal' },
      render: () => (
        <Tab.Pane attached={false} style={{ backgroundColor: 'white', padding: '20px' }}>
          {!loading ? <OrgPanelJobs /> : null}
        </Tab.Pane>
      ),
    },
    {
      menuItem: { content: 'Help Requests', color: 'teal' },
      render: () => (
        <Tab.Pane attached={false} style={{ backgroundColor: 'white', padding: '20px' }}>
          {!loading ? <OrgPanelHelpRequests /> : null}
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Dimmer active inverted>
          <Loader content='Loading...' />
        </Dimmer>
      ) : (
        <Segment style={{ background: '#f5f5f5', borderRadius: '10px', padding: '20px' }}>
          <Header as="h2" textAlign="center" style={{ color: '#1F79A3' }}>
            Welcome to the Organization Panel
          </Header>

          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Segment>
      )}
    </>
  );
});
