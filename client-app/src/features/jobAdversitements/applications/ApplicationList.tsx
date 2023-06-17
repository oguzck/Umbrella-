import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import ApplicationListItem from './ApplicationListItem';
import { Header, Segment, Message, Dimmer, Loader } from 'semantic-ui-react';
import NotFound from '../../errors/NotFound';
import { observer } from 'mobx-react-lite';

export default observer(function ApplicationList() {
  const { id } = useParams();
  const { jobAdverStore } = useStore();
  const {
    loadJobAdversitement,
    selectedJobAdversitement,
    loadingInitial,
    clearSelectedJobAdversitement,
  } = jobAdverStore;

  const { userStore } = useStore();

  useEffect(() => {
    if (id) loadJobAdversitement(id);
    else return () => clearSelectedJobAdversitement();
  }, [id, loadJobAdversitement, clearSelectedJobAdversitement]);

  if (loadingInitial || !selectedJobAdversitement) {
    return (
      <Dimmer active inverted>
        <Loader content="Loading applications..." />
      </Dimmer>
    );
  }

  return (
    <>
    <Segment>
        <Header content={`Applications of ${selectedJobAdversitement.title}`} style={{ color: '#1F79A3' }} as={'h2'} textAlign='center'/>
      {selectedJobAdversitement.applications.length === 0 ? (
        <NotFound content="There are no applications to display" />
      ) : (
        selectedJobAdversitement.applications.map((application) => (
          <Segment key={application.id}>
            <ApplicationListItem application={application} />
          </Segment>
        ))
      )}
      </Segment>
    </>
  );
});
