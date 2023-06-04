import { makeAutoObservable, runInAction } from "mobx";
import { JobAdversitementsFormValues , JobAdversitements } from "../models/jobAdversitement";
import agent from "../api/agent";
import { router } from "../router/Routes";
import { ApplicationFormValues } from "../models/applications";

export class JobAdverStore {
    loading = false;
    jobAdversitements :JobAdversitements[]=[]
    loadingInitial = false
    selectedJobAdversitement : JobAdversitements|undefined=undefined
    jobAdversitementRegistry = new Map<string, JobAdversitements>();
    constructor() {
        makeAutoObservable(this);
    }
    private getJobAdversitement = (id: string) => {
        return this.jobAdversitementRegistry.get(id);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    clearSelectedJobAdversitement =()=>{
        this.selectedJobAdversitement = undefined;
    }
    createJobAdversitement = async (jobAdversitement : JobAdversitementsFormValues)=>{
        this.loading = true;
        try {
             await agent.JobAdversitement.create(jobAdversitement);
            runInAction(()=>{
                this.loading = false
                router.navigate('/organizationPanel')
            })
        } catch (error) {
            this.loading=false;
            console.log(error);
        }
    }
    listJobAdversitement = async ()=>{
        this.loading = true;
        try {
             this.jobAdversitements=await agent.JobAdversitement.list();
             runInAction(()=> this.loading=false)
        } catch (error) {
            this.loading=false;
            console.log(error);
        }
    }
    loadJobAdversitement= async (id: string) => {
        let jobAdversitement = this.getJobAdversitement(id);
        if(jobAdversitement){
            this.selectedJobAdversitement = jobAdversitement;
            return jobAdversitement
        }
        else{
            this.setLoadingInitial(true);
        try {
            jobAdversitement = await agent.JobAdversitement.details(id)
            runInAction(()=>{
                this.selectedJobAdversitement = jobAdversitement
            });
            this.setLoadingInitial(false);
            return jobAdversitement
        } catch (error) {
            console.log(error)
            runInAction(()=> this.setLoadingInitial(false))
        }
        }
    }
    applyJob = async (id:string,application : ApplicationFormValues)=>{
        console.log(id)
        this.loading=true
        if(id){
            try {
                console.log(application)
                await agent.JobAdversitement.apply(id,application)
                runInAction(()=>{
                    this.loading=false
                    router.navigate('/jobadversitements')
                })
            } catch (error) {
                console.log(error)
                runInAction(()=> this.loading=false)
            }
        }
    }

}