import { makeAutoObservable, reaction, runInAction } from "mobx";
import { store } from "./store";
import { OrgProfile, Photo } from "../models/organizationProfile";
import agent from "../api/agent";


export default class OrgProfileStore {

    activeTab = 0;
    profile: OrgProfile | null = null;
    loadingProfile = false;
    loading = false
    profileList : OrgProfile[]=[]
    uploading = false;
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
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }
    listProfiles = async () => {
        this.loading = true;
        try {
            const profiles = await agent.OrgProfiles.list()
            runInAction(() => {
                this.profileList = profiles;
                this.loading=false
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }
    uploadPhoto = async (file : Blob) =>{
        this.uploading = true;
        try {
            const response = await agent.OrgProfiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(()=>{
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMain && store.organizationStore.userOrg) {
                        store.organizationStore.setImage(photo.url);
                        this.profile.image = photo.url;
                    }
                }
                this.uploading = false
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>this.uploading=false)
        }
    }
    setMainPhoto = async (photo : Photo) =>{
        this.loading = true
        try {
            await agent.OrgProfiles.setMainPhoto(photo.id);
            store.organizationStore.setImage(photo.url);
            runInAction(()=>{
                if (this.profile&&this.profile.photos) {
                    this.profile.photos.find(p=>p.isMain)!.isMain = false;
                    this.profile.photos.find(p=>p.id == photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(()=> this.loading = false);
            console.log(error)
        }
    }
    deletePhoto = async (photo:Photo) => {
        this.loading = true;
        try {
            await agent.OrgProfiles.deletePhoto(photo.id)
            runInAction(()=>{
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(p=>p.id !==photo.id)
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(()=> this.loading=false)
            console.log(error);
        }
    }
    updateProfile = async (profile:Partial<OrgProfile>) =>{
        this.loading = true;
        try {
            await agent.OrgProfiles.updateProfile(profile)
            runInAction(()=>{
                if (profile.displayName && profile.displayName!== store.organizationStore.userOrg?.displayName) {
                    store.userStore.setDisplayname(profile.displayName);
                }
                this.profile = {...this.profile,...profile as OrgProfile};
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=> this.loading = false )
        }
    }

}
