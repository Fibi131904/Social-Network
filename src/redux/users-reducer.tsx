import { ThunkAction, ThunkDispatch } from "redux-thunk"
import {  usersAPI } from "../api/api"
import { AppStateType } from "./redux-store"



const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURREN_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING='TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLOWING_PROGRESS = 'TOGGLE_IS_FOLOWING_PROGRESS'

export type UserType = {
    id: number
    fullName: string
    pfotoUrl: string
    followed: boolean
    status: null | string
    location: UsersLocation
    photos: { small: string, large: string } | null
    name: string
}
type UsersLocation = {
    city: string
    country: string
}
export type InitialStateType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount:number,
    currentPage:number,
    isFetching:boolean,
    followingInProgress:Array<number>
}

const initionState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount:0,
    currentPage: 1,
    isFetching: false,
    followingInProgress:[]
    

}

export const usersReducer = (state: InitialStateType = initionState, action: ActionUsersType):InitialStateType=> {
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
            return { ...state, isFetching: action.payload.isFetching }
        }
        case TOGGLE_IS_FOLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
                default: {
            return state
        }
    }
}

type ActionUsersType =
    | ReturnType<typeof followSucces>
    | ReturnType<typeof unfollowSucces>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof togglefollowingInProgress>

export const followSucces = (usersId: number) => {
    return {
        type: FOLLOW,
        payload: { usersId }
    } as const
}
export const unfollowSucces = (usersId: number) => {
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
export const togglefollowingInProgress = (isFetching: boolean, userId: number) => {
    return {
        type: TOGGLE_IS_FOLOWING_PROGRESS,
        isFetching,
         userId
        } as const
}

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionUsersType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionUsersType>

export const getUsers = (currentPage: number, pageSize: number):ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(toggleIsFetching(true));

        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setUsersTotalCount(data.totalCount));
                dispatch(setCurrentPage(currentPage))
            });
    }
}
export const follow = (userId: number, pageSize: number):ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(togglefollowingInProgress(true, userId))

        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSucces(userId))
                }
                dispatch(togglefollowingInProgress(false, userId))
            })
    }
}
// export const unfollow = (userId: number, pageSize: number):ThunkType => {
//     return (dispatch:ThunkDispatchType) => {
//         dispatch(togglefollowingInProgress(true, userId))

//         usersAPI.unfollow(userId)
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     dispatch(unfollowSucces(userId))
//                 }
//                 dispatch(togglefollowingInProgress(false, userId))
//             })
//     }
// }
export const unfollow = (userId: number, pageSize: number):ThunkType => async dispatch=> {
    try{
        const res = await  usersAPI.unfollow(userId)
        if (res.data.resultCode === 0) {
            dispatch(unfollowSucces(userId))
        }
        dispatch(togglefollowingInProgress(false, userId))
        } catch (error){
           console.error(Error)
        }
        
    }
   
    







