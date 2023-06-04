import { makeAutoObservable, runInAction } from "mobx";
import { Organization, OrganizationFormValues } from "../models/organization";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class OrganizationStore{
    userOrg : Organization | null = null;
    constructor(){
        makeAutoObservable(this);
    }
     get isLoggedIn(){
        return !!this.userOrg;
     }
     login = async (creds : OrganizationFormValues)=>{
        try{
            const user = await agent.OrganizationAccount.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(()=> this.userOrg=user)
            router.navigate('/organizationPanel');
            store.modalStore.closeModal();
            console.log(user);
        }catch(error){
            throw error;
        }
     }

     logoutOrg = () =>{
        store.commonStore.setToken(null);
        this.userOrg = null ;
        store.userStore.user=null;
        runInAction(()=>{
            router.navigate('/')
        })
     }
     getUser = async () =>{
        try {
            const user = await agent.OrganizationAccount.current();
            runInAction(()=>this.userOrg = user)
        } catch (error) {
            console.log(error);
        }
     }
}