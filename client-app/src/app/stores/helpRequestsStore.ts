import { makeAutoObservable, runInAction } from "mobx";
import { HelpRequestFormValues } from "../models/HelpRequest";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";
import Success from "../common/form/Success";

export class HelpRequestStore{
    loading = false
    constructor() {
       makeAutoObservable(this);
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
}