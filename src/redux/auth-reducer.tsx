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

type ActionUsersType = ReturnType<typeof setAuthUserData>



export const authReducer = (state: InitionStateType = initionState, action: ActionUsersType): InitionStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                resultCode: 0,
                messages: [],
                isAuth: true


            }
        default:
            return state

    }

}


export const setAuthUserData = (data: { id: number, email: string, login: string, isAuth: boolean }) => {
    return {
        type: SET_USER_DATA,
        payload: { data }
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
                    dispatch(setAuthUserData({ id, email, login, isAuth: true }))
                }

            });
    }
}


   

    
