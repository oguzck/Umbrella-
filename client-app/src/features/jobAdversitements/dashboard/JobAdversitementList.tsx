import React from 'react'
import { useStore } from '../../../app/stores/store'
import { Header } from 'semantic-ui-react';
import JobAdversitementListItem from './JobAdversitementListItem';
import { observer } from 'mobx-react-lite';
import NotFound from '../../errors/NotFound';

export default observer( function JobAdversitementList() {
  const {jobAdverStore} = useStore();
  const {jobAdversitements} = jobAdverStore
  return (
    <>
    <Header content='Job Adversitements' color='teal'/>
        {jobAdversitements.length<1 &&
        (<NotFound content='There is no job adversitements to display'/>)
        }
        {jobAdversitements.map(jobAdversitement => (
                <JobAdversitementListItem jobadver={jobAdversitement}/>
            ))}
    </>
  )
})
