import { combineReducers, createStore } from "redux";
import { dialogsReducer } from "./dialogs-reducer";
import { profileReducer } from "./profile-reducer";
import sidebarReducer from './sidebar-reducer'


export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
})
export type AppStateType = ReturnType<typeof rootReducer> //типизация стейта всего приложения

export let store = createStore(rootReducer)

window.store=store
