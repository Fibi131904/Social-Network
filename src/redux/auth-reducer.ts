import { securityAPI } from './../api/api';
import { stopSubmit } from "redux-form"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { authAPI } from "../api/api"
import { AppStateType } from "./redux-store"



const SET_USER_DATA = "network/auth/SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = "network/auth/GET_CAPTCHA_URL_SUCCESS"


export type AuthStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}

const initialState: AuthStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
   captchaUrl: null
}

type ActionUsersType = 
ReturnType<typeof setUserData>  | ReturnType<typeof stopSubmit> | ReturnType<typeof getCaptchaUrlSuccess>



export const authReducer = (state: AuthStateType = initialState, action: ActionUsersType): AuthStateType => {

    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
         
            return {
                ...state,
                ...action.payload
            }
       
        default:
            return state
    }

}


export const setUserData =  (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    } as const
}
export const getCaptchaUrlSuccess =  (captchaUrl:string) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    } as const
}


export type AuthThunkType = ThunkAction<any, AppStateType, unknown, ActionUsersType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionUsersType>


export const getAuthUserData = (): AuthThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data
        dispatch(setUserData( id, email, login,  true ))
    }
}
export const getCaptchaUrl = (): AuthThunkType => async (dispatch: ThunkDispatchType) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string ): AuthThunkType =>
    async (dispatch: ThunkDispatchType) => {
        const response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', { _error: message }))
        }
    }


export const logout = (): AuthThunkType => {
    return (dispatch: ThunkDispatchType) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserData(null, null, null, false))
                }
            });
    }
}


   

    
