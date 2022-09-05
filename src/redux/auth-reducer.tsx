import { stopSubmit } from "redux-form"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { authAPI } from "../api/api"
import { AppStateType } from "./redux-store"



const SET_USER_DATA = "SET_USER_DATA"

export type InitionStateType = {
    data: {
        id: number | null,
        email: string,
        login: string
    },
    resultCode: number,
    messages: Array<string>,
    isAuth: boolean
}

const initionState: InitionStateType = {
    data: {
        id: null,
        email: '',
        login: ''
    },
    resultCode: 0,
    messages: [],
    isAuth: false
}

type ActionUsersType = ReturnType<typeof setAuthUserData> |  ReturnType<typeof stopSubmit>



export const authReducer = (state: InitionStateType = initionState, action: ActionUsersType): InitionStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state

    }

}


export const setAuthUserData = (id: number, email: string, login: string, isAuth: boolean ) => {
    return {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth }
    } as const
}


export type AuthThunkType = ThunkAction<any, AppStateType, unknown, ActionUsersType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionUsersType>


export const getAuthUserData = (): AuthThunkType => {
    return (dispatch: ThunkDispatchType) => {
        authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let { id, email, login } = response.data.data
                    dispatch(setAuthUserData(id, email, login, true))
                }

            });
    }
}
export const login = (email: string, password: string, rememberMe: boolean): AuthThunkType => {
    return (dispatch: ThunkDispatchType) => {
        authAPI.login(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserData())
                } else {
                    let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
                    dispatch(stopSubmit('login', {_error: message}))

                };
            })
    }
}
export const logout = (): AuthThunkType => {
    return (dispatch: ThunkDispatchType) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(0, '', '', false))
                }

            });
    }
}


   

    
