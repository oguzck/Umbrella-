import React, { useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { Header } from 'semantic-ui-react';
import JobAdversitementListItem from './JobAdversitementListItem';
import { observer } from 'mobx-react-lite';
import NotFound from '../../errors/NotFound';
import { JobAdversitements } from '../../../app/models/jobAdversitement';

interface Props {
  activeFilter: string;
}

export default observer(function JobAdversitementList({ activeFilter }: Props) {
  const { jobAdverStore } = useStore();
  const { jobAdversitements } = jobAdverStore;
  const [filtered, setFiltered] = useState<JobAdversitements[]>([]);

  useEffect(() => {
    console.log(activeFilter)
    if (activeFilter === 'all') {
      setFiltered(jobAdversitements);
    }
    else if (activeFilter === 'paid') {
      setFiltered(jobAdversitements.filter(x => x.isPaid));
    }
    else if (activeFilter === 'voluntary') {
      setFiltered(jobAdversitements.filter(x => !x.isPaid));
    }
  }, [activeFilter, jobAdversitements]);


  return (
    <>
      {filtered.length < 1 && (
        <NotFound content='There are no job advertisements to display' />
      )}
      {filtered.map(jobAdversitement => (
        <JobAdversitementListItem jobadver={jobAdversitement} key={jobAdversitement.id} />
      ))}
    </>
  );
});
