
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURREN_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING='TOGGLE_IS_FETCHING'



let initionState: UsersStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount:10,
    currentPage: 1,
    isFetching: false 

}

export const usersReducer = (state: UsersStateType = initionState, action: ActionType):UsersStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.payload.usersId ? {...u, followed:true} : u)}
        }
        case UNFOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.payload.usersId ? {...u, followed:false} : u)}
        }
        case SET_USERS: {
            return {...state, users: action.payload.users}
        }
        case SET_CURRENT_PAGE:{
            return {...state, currentPage: action.payload.currentPage}
        }
        case SET_TOTAL_USERS_COUNT:{
            return {...state, totalUsersCount: action.payload.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING:{
            return {...state, isFetching: action.payload.isFetching}
        }
        default: {
            return state
        }
    }
}



export const follow = (usersId: number) => {
    return {
        type: FOLLOW,
        payload: { usersId }
    } as const
}
export const unfollow = (usersId: number) => {
    return {
        type: UNFOLLOW,
        payload: { usersId }
    } as const
}
export const setUsers = (users: Array<UserType>) => {
    return {
        type: SET_USERS,
        payload: { users }

    } as const
}
export const setCurrentPage=(currentPage:number)=>{
    return{
        type: SET_CURRENT_PAGE, 
        payload: {currentPage}
    } as const
}
export const setUsersTotalCount=(totalUsersCount:number)=>{
    return{
        type: SET_TOTAL_USERS_COUNT, 
        payload: {totalUsersCount}
    } as const
}
export const toggleIsFetching=(isFetching:boolean)=>{
    return{
        type: TOGGLE_IS_FETCHING, 
        payload: {isFetching}
    } as const
}

type FollowType=ReturnType<typeof follow>
type UnfollowType=ReturnType<typeof unfollow>
type SetUsersType= ReturnType<typeof setUsers>
type SetCurrentPageType= ReturnType<typeof setCurrentPage>
type SetUsersTotalCountType= ReturnType<typeof setUsersTotalCount>
type ToggleIsFetchingType= ReturnType<typeof toggleIsFetching>

type ActionType = FollowType
    | UnfollowType
    | SetUsersType
    | SetCurrentPageType
    | SetUsersTotalCountType
    | ToggleIsFetchingType
    
export type UserType = {
    id: number
    fullName: string
    pfotoUrl: string
    followed: boolean
    status: string
    location: UsersLocation
    photos?: any
    name:string
}
type UsersLocation = {
    city: string
    country: string
}

export type UsersStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount:number
    currentPage:number
    isFetching:boolean
}
