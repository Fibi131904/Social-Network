
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURREN_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING='TOGGLE_IS_FETCHING'

export type UserType = {
    id: number
    fullName: string
    pfotoUrl: string
    followed: boolean
    status: string
    location: UsersLocation
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

let initionState: UsersStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount:0,
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
            return {...state, totalUsersCount: action.payload.totalCount}
        }
        case TOGGLE_IS_FETCHING:{
            return {...state, isFetching: action.payload.isFetching}
        }
        default: {
            return state
        }
    }
}
type followACType=ReturnType<typeof followAC>
type unfollowACType=ReturnType<typeof unfollowAC>
type setUsersACType= ReturnType<typeof setUsersAC>
type setCurrentPageACType= ReturnType<typeof setCurrentPageAC>
type setTotalUsersCountACType= ReturnType<typeof setTotalUsersCountAC>
type toggleIsFetchingACType= ReturnType<typeof toggleIsFetchingAC>

type ActionType = followACType
    | unfollowACType
    | setUsersACType
    | setCurrentPageACType
    | setTotalUsersCountACType
    | toggleIsFetchingACType


export const followAC = (usersId: number) => {
    return {
        type: FOLLOW,
        payload: { usersId }
    } as const
}
export const unfollowAC = (usersId: number) => {
    return {
        type: UNFOLLOW,
        payload: { usersId }
    } as const
}
export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: SET_USERS,
        payload: { users }

    } as const
}
export const setCurrentPageAC=(currentPage:number)=>{
    return{
        type: SET_CURRENT_PAGE, 
        payload: {currentPage}
    } as const
}
export const setTotalUsersCountAC=(totalCount:number)=>{
    return{
        type: SET_TOTAL_USERS_COUNT, 
        payload: {totalCount}
    } as const
}
export const toggleIsFetchingAC=(isFetching:boolean)=>{
    return{
        type: TOGGLE_IS_FETCHING, 
        payload: {isFetching}
    } as const
}
