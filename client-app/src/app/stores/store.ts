import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import CommentStore from "./commentStore";
import { HelpRequestStore } from "./helpRequestsStore";


interface Store {
    activityStore: ActivityStore
    commonStore: CommonStore
    userStore: UserStore
    modalStore: ModalStore
    profileStore: ProfileStore
    commentStore: CommentStore
    helpRequestStore: HelpRequestStore

}
export const store: Store = {

    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore(),
    helpRequestStore: new HelpRequestStore()

}
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}