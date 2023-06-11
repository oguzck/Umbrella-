import { JobAdversitements } from "./jobAdversitement";

export interface OrgProfile {
    username : string;
    displayName : string;
    image?:string;
    description? : string;
    photos? : Photo[];
    donationIban : string;
    donationDescription : string;
    jobAdversitements : JobAdversitements[]
    phoneNumber : string;
    contactEmail : string;
}
export interface Photo {
    id:string;
    url : string;
    isMain : boolean;
}