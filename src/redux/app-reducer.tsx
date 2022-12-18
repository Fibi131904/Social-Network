import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { getAuthUserData } from "./auth-reducer"
import { AppStateType, InferActionsTypes } from "./redux-store"






const initialState= {
  initialized: true
}
export type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>



export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case  'network/app/INITIALIZED_SUCCESS' :
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}


export const actions={ 
    initializedSuccess : () =>({ type: 'network/app/INITIALIZED_SUCCESS', } as const)
}

export type AuthThunkType = ThunkAction<any, AppStateType, unknown, ActionType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionType>

export const initializeApp = (): AuthThunkType => (dispatch: ThunkDispatchType) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(actions.initializedSuccess());
    })
}

   