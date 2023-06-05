import { HelpRequest } from "./HelpRequest";
import { Activity } from "./activity";
import { User } from "./user";

export interface Profile {
    username : string;
    displayName : string;
    image?:string;
    bio? : string;
    photos? : Photo[];
    followersCount : number;
    followingCount : number;
    following : boolean;
    helpRequests : HelpRequest[];
    activities : Activity[];
}

export class Profile implements Profile{

    constructor(user:User) {
        this.username = user.userName;
        this.displayName = user.displayName;
        this.image = user.image;

    }

}
export interface Photo {
    id:string;
    url : string;
    isMain : boolean;
}