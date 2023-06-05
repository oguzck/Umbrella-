import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { useStore } from '../../app/stores/store'
import LoadingComponent from '../../app/layout/LoadingComponent'
import OrgProfileHeader from './OrgProfileHeader'
import OrgProfileContent from './OrgProfileContent'
import { Grid } from 'semantic-ui-react'

export default observer(function OrgProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { orgProfileStore } = useStore();
    const { loadingProfile, loadProfile, profile , setActiveTab } = orgProfileStore;
    useEffect(() => {
        loadProfile(username!);
        return ()=>{
            setActiveTab(0);
        }
    }, [loadProfile, username])

    if (loadingProfile) return <LoadingComponent content='Loading Profile..' />
    return (
        <Grid>
            <Grid.Column width={16}>
                {profile &&
                    <>
                        <OrgProfileHeader profile={profile} />
                        <OrgProfileContent profile={profile} />
                    </>
                }

            </Grid.Column>
        </Grid>
    )
})
