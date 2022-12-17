import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { authAPI } from "../api/authAPI";
import { securityAPI } from "../api/securityAPI";
import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "../api/types";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store"
import { Action } from 'redux';




const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}


   


export const authReducer = ( state:InitialStateType= initialState, action: ActionsType
):InitialStateType=> {
  switch (action.type) {
    case 'network/auth/SET_USER_DATA':
    case 'network/auth/GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}


export const actions ={
 setUserData :(userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: 'network/auth/SET_USER_DATA',
        payload: { userId, email, login, isAuth }
    } as const
},

 getCaptchaUrlSuccess : (captchaUrl: string) => ({ type: 'network/auth/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl }} as const)
}




export const getAuthUserData = (): AuthThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = meData.data
        dispatch(actions.setUserData(id, email, login, true))
    }
}
export const getCaptchaUrl = (): AuthThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string): AuthThunkType =>
    async (dispatch) => {
        const data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData())
        } else {
            if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', { _error: message }))
        }
    }


export const logout = (): AuthThunkType =>async (dispatch) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(actions.setUserData(null, null, null, false))
                }
            });
    }


export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>

export type AuthThunkType = BaseThunkType<ActionsType | FormAction>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionsType> 

    
