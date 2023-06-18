import { observer, useStaticRendering } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Button, Grid, List, Loader } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';
import ActivityForm from '../form/ActivityForm';
import ActivityFilters from './ActivityFilters';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityListItemPlaceHolder from './ActivityListItemPlaceHolder';


export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry, setPagingParams, pagination, setLoadingInitial } = activityStore
    const [loadingNext, setLoadingNext] = useState(false)
    const [loading, setLoading] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadActivities().then(() => setLoadingNext(false))
    }

    useEffect(() => {
        if (activityRegistry.size <= 1) {
            loadActivities();
        }
    }, [activityRegistry.size])


    return (
        <Grid>
            <Grid.Column width='10'>
                {activityStore.loadingInital && !loadingNext ? (
                    <>
                        <ActivityListItemPlaceHolder />
                        <ActivityListItemPlaceHolder />
                    </>
                ) : (
                    <InfiniteScroll pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false} >
                        <ActivityList />
                    </InfiniteScroll>
                )}

            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
})
