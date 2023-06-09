import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore{
    user : User | null = null;

    constructor(){
        makeAutoObservable(this);
    }
     get isLoggedIn(){
        return !!this.user;
     }
     login = async (creds : UserFormValues)=>{
        try{
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(()=> this.user=user)
            router.navigate('/activities');
            store.modalStore.closeModal();
            console.log(user);
        }catch(error){
            throw error;
        }
     }
     register = async (creds : UserFormValues)=>{
        try{
            await agent.Account.register(creds);

            router.navigate(`/account/registerSuccess?email=${creds.email}`);
            store.modalStore.closeModal();
        }catch(error){
            throw error;
        }
     }
     logout = () =>{
        store.commonStore.setToken(null);
        this.user = null ;
        store.organizationStore.userOrg=null;
        runInAction(()=> {
            
            router.navigate('/')
        })
     }
     getUser = async () =>{
        try {
            const user = await agent.Account.current();
            runInAction(()=>this.user = user)
        } catch (error) {
            console.log(error);
        }
     }
     setImage =(image:string) =>{
        if (this.user) {
            this.user.image = image;
        }
     }
     setDisplayname = (name : string) =>{
        if (this.user) {
            this.user.displayName = name;
        }  
     }
}