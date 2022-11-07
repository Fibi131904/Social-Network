import { stopSubmit } from "redux-form";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { authAPI } from "../api/authAPI";
import { securityAPI } from "../api/securityAPI";
import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "../api/types";
import { AppStateType } from "./redux-store"



const SET_USER_DATA = "network/auth/SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = "network/auth/GET_CAPTCHA_URL_SUCCESS"

export type AuthStateType = typeof initialState;

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

type ActionUsersType =
    ReturnType<typeof setUserData> | ReturnType<typeof stopSubmit> | ReturnType<typeof getCaptchaUrlSuccess>


export const authReducer = (
  state: AuthStateType = initialState,
  action: ActionUsersType
): AuthStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}


export const setUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: { userId, email, login, isAuth }
    } as const
}

export const getCaptchaUrlSuccess = (captchaUrl: string) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: { captchaUrl }
    } as const
}


export type AuthThunkType = ThunkAction<any, AppStateType, unknown, ActionUsersType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionUsersType>


export const getAuthUserData = (): AuthThunkType => async (dispatch: ThunkDispatchType) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = meData.data
        dispatch(setUserData(id, email, login, true))
    }
}
export const getCaptchaUrl = (): AuthThunkType => async (dispatch: ThunkDispatchType) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string): AuthThunkType =>
    async (dispatch: ThunkDispatchType) => {
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


   

    
