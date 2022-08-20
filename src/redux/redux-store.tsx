import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { profileReducer } from "./profile-reducer";
import sidebarReducer from './sidebar-reducer'
import { usersReducer } from "./users-reducer";


export const rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer
})
export type AppStateType = ReturnType<typeof rootReducers> //типизация стейта всего приложения

export let store = createStore(rootReducers, applyMiddleware(thunk))


