import axios, { AxiosError, AxiosResponse } from 'axios'
import { resolve } from 'path';
import { Activity, ActivityFormValues } from '../models/activity';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/user';
import { Photo, Profile } from '../models/profile';
import { HelpRequest, HelpRequestFormValues } from '../models/HelpRequest';
import { Organization, OrganizationFormValues } from '../models/organization';
import { ApplicationFormValues, Applications } from '../models/applications';
import { JobAdversitements, JobAdversitementsFormValues } from '../models/jobAdversitement';
import { OrgProfile } from '../models/organizationProfile';
import { PaginatedResult } from '../models/pagination';
import { json } from 'stream/consumers';
import { UserActivity } from '../models/userActivity';

axios.defaults.baseURL = process.env.REACT_APP_API_URL

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config=>{
    const token = store.commonStore.token;
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV==='development') {
        await sleep(1000);
    }
    const pagination = response.headers['pagination'];
    if(pagination){
        response.data = new PaginatedResult(response.data,JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error: AxiosError) => {
    const { data, status ,config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if(config.method ==='get'&& data.errors.hasOwnProperty('id')){
                router.navigate('/not-found');
            }
            if(data.errors){
                const modalStateErrors= [];
                for(const key in data.errors){
                    if (data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }else{
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 405:
            toast.error('forbidden');
            break;
        case 404:
            //toast.error('not found');
            router.navigate('/not-found');
            break
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
})
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: (params : URLSearchParams) => axios.get<PaginatedResult<Activity[]>>('/activities',{params}).then(responseBody),
    list2: () => requests.get<PaginatedResult<Activity[]>>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: ActivityFormValues) => requests.post<void>('/activities', activity),
    update: (activity: ActivityFormValues) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<Activity>(`/activities/${id}`),
    attend : (id : string) => requests.post<void>(`/activities/${id}/attend`,{})

}
const Account={
    current : ()=> requests.get<User>('/account'),
    login : (user : UserFormValues) => requests.post<User>('/account/login',user),
    register : (user : UserFormValues) => requests.post<User>('/account/register',user),
    verifyEmail : (token: string , email : string) => 
            requests.post<void>(`/account/verifyEmail?token=${token}&email=${email}`,{}),
    resendEmailConfirm : (email : string) => requests.get(`/account/resendEmailConfirmationLink?email=${email}`)

}
const OrganizationAccount={
    current : ()=> requests.get<Organization>('/account'),
    login : (user : OrganizationFormValues) => requests.post<Organization>('/organization/login',user),
    //register : (user : UserFormValues) => requests.post<User>('/account/register',user)

}
const Profiles={
    get : (username : string ) => requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto :(file:Blob) => {
        let formData = new FormData();
        formData.append('File',file);
        return axios.post<Photo>('photos',formData,{
            headers:{'Content-Type':'multipart/form-data'}
        })
    },
    setMainPhoto : (id : string) => requests.post(`/photos/${id}/setMain`,{}),
    deletePhoto : (id:string) => requests.del(`/photos/${id}`),
    updateProfile : (profile : Partial<Profile>) => requests.put('/profiles',profile),
    updateFollowing : (username: string) => requests.post(`/follow/${username}`,{}),
    listFollowings : (username : string , predicate : string) => requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
    listActivities : (username : string , predicate : string) => requests.get<UserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`)
}
const HelpRequests = {
    create: (helprequest: HelpRequestFormValues) => requests.post<void>('/helprequests', helprequest),
    list : ()=>requests.get<HelpRequest[]>('/helprequests'),
    details : (id : string)=>requests.get<HelpRequest>(`/helprequests/${id}`),
    toggle :(id : string) => requests.post(`/helprequests/${id}/toggle`,{}) ,
    delete :(id : string) => requests.del(`/helprequests/${id}/`) 
}
const JobAdversitement = {
    create: (jobAdversitement: JobAdversitementsFormValues) => requests.post<void>('/jobadversitements', jobAdversitement),
    list : ()=>requests.get<JobAdversitements[]>('/jobadversitements'),
    details : (id : string)=>requests.get<JobAdversitements>(`/jobadversitements/${id}`),
    apply :(id : string , application : ApplicationFormValues) => requests.post(`/jobadversitements/${id}/apply`,application) ,
    delete :(id : string) => requests.del(`/jobadversitements/${id}/`) 
}
const OrgProfiles={
    get : (username : string ) => requests.get<OrgProfile>(`/orgprofiles/${username}`),
    list : () => requests.get<OrgProfile[]>(`/orgprofiles`),
    uploadPhoto :(file:Blob) => {
        let formData = new FormData();
        formData.append('File',file);
        return axios.post<Photo>('photos',formData,{
            headers:{'Content-Type':'multipart/form-data'}
        })
    },
    setMainPhoto : (id : string) => requests.post(`/photos/${id}/setMain`,{}),
    deletePhoto : (id:string) => requests.del(`/photos/${id}`),
    updateProfile : (profile : Partial<OrgProfile>) => requests.put('/orgprofiles',profile),
}
const agent = {
    Profiles,
    Activities,
    Account,
    HelpRequests,
    OrganizationAccount,
    JobAdversitement,
    OrgProfiles

}
export default agent;