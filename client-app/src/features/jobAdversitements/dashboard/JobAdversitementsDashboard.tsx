import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import JobAdversitementList from './JobAdversitementList'
import JobAdversitementFilters from './JobAdversitementFilters'
import { useStore } from '../../../app/stores/store'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { observer } from 'mobx-react-lite'

export default observer( function JobAdversitementsDashboard() {
    const {jobAdverStore} = useStore()
    const {listJobAdversitement,loading} = jobAdverStore
    useEffect(() => {
         listJobAdversitement()
    }, [listJobAdversitement])
    if(loading) return <LoadingComponent content='Loading Jobs'/>
    return (
        <Grid>
            <Grid.Column width='10'>
                <JobAdversitementList />
            </Grid.Column>
            <Grid.Column width='6'>
                <JobAdversitementFilters />
            </Grid.Column>
        </Grid>
    )
})
