import { AuthDataType } from "../components/Header/HeaderContainer"


const SET_USER_DATA = "SET_USER_DATA"




const initionState: AuthDataType= {
      id: null,
      email: '',
      login: '',
      isAuth: false
 }

type ActionType = SetUserDataType

export const authReducer = (state= initionState, action: ActionType):AuthDataType => {
   
    switch (action.type) {
        case SET_USER_DATA: {
                       return {...state,
                ...action.payload,isAuth: true
        }
    
    }
        default: {
            return state
        }
    }
}



export const setAuthUserData=(id:number, email:string, login:string)=>{
    return{
        type: SET_USER_DATA, 
         payload:{id, email,login}
    } as const
}

type SetUserDataType=ReturnType<typeof setAuthUserData>


   

    
