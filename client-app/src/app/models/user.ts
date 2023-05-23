export interface User{
    userName : string;
    displayName : string,
    token : string;
    image?:string;
    isUser : boolean;
}
export interface UserFormValues{
    email : string;
    password : string;
    username? : string;
    displayName? : string;

}