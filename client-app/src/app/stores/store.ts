import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import CommentStore from "./commentStore";
import { HelpRequestStore } from "./helpRequestsStore";
import OrganizationStore from "./organizationStore";
import { JobAdverStore } from "./jobAdverStore";


interface Store {
    activityStore: ActivityStore
    commonStore: CommonStore
    userStore: UserStore
    modalStore: ModalStore
    profileStore: ProfileStore
    commentStore: CommentStore
    helpRequestStore: HelpRequestStore
    organizationStore : OrganizationStore
    jobAdverStore : JobAdverStore

}
export const store: Store = {

    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore(),
    helpRequestStore: new HelpRequestStore(),
    organizationStore : new OrganizationStore(),
    jobAdverStore : new JobAdverStore()

}
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}