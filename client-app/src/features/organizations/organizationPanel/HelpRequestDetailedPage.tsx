import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import HelpRequestDetailedHeader from './HelpRequestDetailedHeader';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import HelpRequestDetailedContent from './HelpRequestDetailedContent';

export default observer( function HelpRequestDetailedPage() {
    const { id } = useParams();
    const { helpRequestStore } = useStore();
    const { loadHelpRequest, selectedHelpRequest , loadingInitial ,clearSelectedHelpRequest } = helpRequestStore
    useEffect(() => {
        if (id) loadHelpRequest(id);
        else
        {return ()=>clearSelectedHelpRequest();}
    }, [id,loadHelpRequest,clearSelectedHelpRequest])
    
    if ( loadingInitial  || !selectedHelpRequest) return<LoadingComponent content={''}/>
    return (
        <>
            <Grid textAlign='center'>
                <Grid.Column width={10}>
                <HelpRequestDetailedHeader helprequest={selectedHelpRequest} />
                <HelpRequestDetailedContent helprequest={selectedHelpRequest}/>
                </Grid.Column>
            </Grid>
        </>
    )
})
