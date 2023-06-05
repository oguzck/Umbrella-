import { Applications } from "./applications"

export interface JobAdversitementsFormValues {
    id : string,
    title : string,     
    description : string
    skills : string
    city : string
    isPaid : boolean
}
export interface JobAdversitements{
    id: string,
    title: string,
    date: Date
    expiringDate: Date
    description: string
    skills: string
    isActive: boolean
    isPaid: boolean 
    city : string
    organizationName: string
    organizationUserName: string
    applications: Applications[]
    organizationImage:string;
}