export interface OrganizationFormValues{
    email : string;
    password : string;
}
export interface Organization{
    userName : string;
    displayName : string,
    token : string;
    image?:string;
}