import { makeAutoObservable, reaction, runInAction } from "mobx";
import { store } from "./store";
import { OrgProfile } from "../models/organizationProfile";
import agent from "../api/agent";


export default class OrgProfileStore {

    activeTab = 0;
    profile: OrgProfile | null = null;
    loadingProfile = false;
    constructor() {
        makeAutoObservable(this);
    }
    setActiveTab = (activeTab: any) => {
        this.activeTab = activeTab;
    }
    get isCurrentUser() {
        if (store.organizationStore.userOrg && this.profile) {
            return store.organizationStore.userOrg.userName == this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.OrgProfiles.get(username)
            console.log(profile)
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }
}
