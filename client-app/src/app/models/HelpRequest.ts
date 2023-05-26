export interface HelpRequestFormValues {
    id : string,
    title : string,     
    description : string
}
export interface HelpRequest {
    id : string,
    title : string,     
    date : Date ,
    description : string,
    isActive : boolean,
    email : string,
    username : string,
    displayName : string,
    image : string 
    organizationName? : string
    
}