
const SET_USER_DATA = "SET_USER_DATA"
const UNFOLLOW = "UNFOLLOW"



let initionState: UsersStateType = {
      id: 0,
      email: '',
      login: '',
      isAuth: false
 }
type UsersStateType = {
    id: number,
      email: string,
      login: '',
      isAuth: boolean
}

export const authReducer = (state: UsersStateType = initionState, action: ActionType):UsersStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...state,
                email: state.email,
                id:state.id,
                login:state.login,
                isAuth: true
        }
    }
      
        default: {
            return state
        }
    }
}



export const setAuthUserData=(userId:number, email:string,login:string)=>{
    return{
        type: SET_USER_DATA, 
         data:{userId, email,login}
    } as const
}

type SetUserDataType=ReturnType<typeof setAuthUserData>

type ActionType = SetUserDataType
   

    
