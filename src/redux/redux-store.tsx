import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { profileReducer } from "./profile-reducer";
import sidebarReducer from './sidebar-reducer';
import { usersReducer } from "./users-reducer";
import {reducer as formReducer} from 'redux-form';
import { appReducer } from "./app-reduser";


export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

export type AppStateType = ReturnType<typeof rootReducer> //типизация стейта всего приложения

export let store = createStore(rootReducer, applyMiddleware(thunk))


