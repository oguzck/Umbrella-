import React, { useEffect, useState } from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import JobAdversitementList from './JobAdversitementList';
import JobAdversitementFilters from './JobAdversitementFilters';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';

export default observer(function JobAdversitementsDashboard() {
  const { jobAdverStore } = useStore();
  const { listJobAdversitement, loading } = jobAdverStore;
  const [activeFilter, setActiveFilter] = useState('all');
  useEffect(() => {
    listJobAdversitement();
  }, [listJobAdversitement]);

  if (loading) return <LoadingComponent content='Loading Jobs' />;

  return (
      <>
      <Grid columns={2} stackable>
              <Grid.Column width={10}>
                  <JobAdversitementList activeFilter={activeFilter} />
              </Grid.Column>
              <Grid.Column width={6}>
                  <JobAdversitementFilters setActiveFilter={setActiveFilter} activeFilter={activeFilter} />
              </Grid.Column>
          </Grid>
          </>
 
  );
});
