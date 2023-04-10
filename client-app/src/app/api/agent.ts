import axios, { AxiosError, AxiosResponse } from 'axios'
import { resolve } from 'path';
import { Activity } from '../models/activity';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
import { store } from '../stores/store';

axios.defaults.baseURL = 'http://localhost:5000/api';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response => {
    await sleep(1000);
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
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<Activity>(`/activities/${id}`),

}

const agent = {
    Activities
}
export default agent;