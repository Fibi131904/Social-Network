import { dialogsReducer, sendMessageAC, updateMessageBodyAC } from './dialogs-reducer'
import { addPostAC, profileReducer, updateNewPostTextAC } from "./profile-reducer"
import sidebarReducer from './sidebar-reducer'




export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    message: Array<MessagesType>
    newMessageBody: string
}
export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}
export type FrendsType = {
    id: number
    name: string
}
export type SidebarType = {
    frends: FrendsType
}
export type StoreType = {
    _state: StateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => StateType
    dispatch: (action: ActionType) => void
}
export type ActionType = ReturnType<typeof addPostAC> | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof sendMessageAC> | ReturnType<typeof updateMessageBodyAC>




let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi, how are you?', likesCount: 15 },
                { id: 2, message: 'Hi, how are you?', likesCount: 20 }
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Petya' },
                { id: 2, name: 'Vera' },
                { id: 3, name: 'Seva' },
                { id: 4, name: 'Sasha' },
                { id: 5, name: 'Kolya' }
            ],
            messages: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'Very well' },
                { id: 3, message: 'How are you?' },
                { id: 4, message: 'you?' }
            ],
            newMessageBody: ''
        },
        sidebar: {
            frends: [
                { id: 1, name: 'Petya' },
                { id: 2, name: 'Vera' },
                { id: 3, name: 'Seva' },
            ]
        }

    },
    _callSubscriber() {
        console.log('state is changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action: ActionType) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }
}
}


export default store;

