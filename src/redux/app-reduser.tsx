import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { getAuthUserData } from "./auth-reducer"
import { AppStateType } from "./redux-store"



const INITIALIZED_SUCCESS = " INITIALIZED_SUCCESS"

export type InitialStateType = {
   
    initialized: boolean
}

const initialState: InitialStateType = {
   
    initialized: true
}

type ActionType = ReturnType<typeof initializedSuccess>



export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case  INITIALIZED_SUCCESS :
            return {
                ...state,
                initialized: true
            }
        default:
            return state

    }

}


export const initializedSuccess = () => {
    return {
        type:  INITIALIZED_SUCCESS ,
       
    } as const
}


export type AuthThunkType = ThunkAction<any, AppStateType, unknown, ActionType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionType>

export const initializeApp = (): AuthThunkType => (dispatch: ThunkDispatchType) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(initializedSuccess());
    })
}

   