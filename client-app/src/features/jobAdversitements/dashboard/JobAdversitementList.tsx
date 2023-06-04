import React from 'react'
import { useStore } from '../../../app/stores/store'
import { Header } from 'semantic-ui-react';
import JobAdversitementListItem from './JobAdversitementListItem';
import { observer } from 'mobx-react-lite';

export default observer( function JobAdversitementList() {
  const {jobAdverStore} = useStore();
  const {jobAdversitements} = jobAdverStore
  return (
    <>
    <Header content='Job Adversitements'/>
        {jobAdversitements.map(jobAdversitement => (
                <JobAdversitementListItem jobadver={jobAdversitement}/>
            ))}
    </>
  )
})
