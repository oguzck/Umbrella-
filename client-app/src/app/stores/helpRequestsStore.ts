import { makeAutoObservable, runInAction } from "mobx";
import { HelpRequest, HelpRequestFormValues } from "../models/HelpRequest";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";
import Success from "../common/form/Success";

export class HelpRequestStore{
    loading = false;
    loadingInitial = false
    helpRequests : HelpRequest[]=[]
    helpRequestRegistry = new Map<string, HelpRequest>();
    selectedHelpRequest : HelpRequest|undefined=undefined
    constructor() {
       makeAutoObservable(this);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    clearSelectedHelpRequest =()=>{
        this.selectedHelpRequest = undefined;
    }
    createHelpRequest = async (helpRequest : HelpRequestFormValues)=>{
        this.loading = true;
        try {
             await agent.HelpRequests.create(helpRequest);
            runInAction(()=>{
                this.loading = false
                router.navigate('/activities')
            })
        } catch (error) {
            this.loading=false;
            console.log(error);
        }
    }
    private getHelpRequest = (id: string) => {
        return this.helpRequestRegistry.get(id);
    }
    listHelpRequest = async ()=>{
        this.loading = true;
        try {
             this.helpRequests=await agent.HelpRequests.list();
             runInAction(()=> this.loading=false)
        } catch (error) {
            this.loading=false;
            console.log(error);
        }
    }
    loadHelpRequest = async (id: string) => {
        let helpRequest = this.getHelpRequest(id);
        if(helpRequest){
            this.selectedHelpRequest = helpRequest;
            return helpRequest;
        }
        else{
            this.setLoadingInitial(true);
        try {
            helpRequest = await agent.HelpRequests.details(id)
            runInAction(()=>{
                this.selectedHelpRequest = helpRequest
            });
            this.setLoadingInitial(false);
            console.log(this.selectedHelpRequest)
            return helpRequest
        } catch (error) {
            console.log(error)
            runInAction(()=> this.setLoadingInitial(false))
        }
        }
    }
    toggleHelpRequest = async () => {
        this.loading = true;
        try {
          await agent.HelpRequests.toggle(this.selectedHelpRequest!.id);
          runInAction(() => {
            this.selectedHelpRequest!.isActive = !this.selectedHelpRequest!.isActive;
            this.selectedHelpRequest!.organizationName = store.organizationStore.userOrg?.displayName 
            this.helpRequestRegistry.set(this.selectedHelpRequest!.id, this.selectedHelpRequest!);
            this.loading=false;
          });
        } catch (error) {
          console.log(error);
          runInAction(() => (this.loading = false));
        }
      };
      
      

}