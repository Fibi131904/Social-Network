import { updateObjectInArray } from './../utils/helpers/object-helpers';
import { AxiosResponse } from "axios"
import { Dispatch } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { usersAPI } from "../api/api"
import { AppStateType } from "./redux-store"


export type UserType = {
    id: number
    fullName: string
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

export type InitialStateType = typeof initionState
export type FilterType = typeof initionState.filter

const initionState = {
    users: [] as Array<UserType>,
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    portionSize: 10,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}


export const usersReducer = (state: InitialStateType = initionState, action: ActionUsersTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW': 
            return { ...state,
                 users: updateObjectInArray(state.users, action.payload.userId, 'id',{followed:true})
        }
        case 'UNFOLLOW': 
            return { ...state,
                 users: updateObjectInArray(state.users, action.payload.userId, 'id',{followed:false})
        }
        case 'SET_USERS': 
            return { ...state, users: action.payload.users }
        
        case 'SET_CURRENT_PAGE': 
            return { ...state, currentPage: action.payload.currentPage }
        
        case 'SET_FILTER': 
            return { ...state, filter: action.payload}
        
        case 'SET_TOTAL_USERS_COUNT': 
            return { ...state, totalUsersCount: action.payload.totalUsersCount }
        
        case 'TOGGLE_IS_FETCHING': 
            return { ...state, isFetching: action.payload.isFetching }
        
        case "TOGGLE_IS_FOLOWING_PROGRESS":
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

type ActionUsersTypes =
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setFilter>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof togglefollowingInProgress>

export const followSuccess = (userId: number) => ({ type: 'FOLLOW', payload: { userId } } as const)
export const unfollowSuccess = (userId: number) => ({ type: 'UNFOLLOW', payload: { userId } } as const)
export const setUsers = (users: Array<UserType>) => ({ type: 'SET_USERS', payload: { users } } as const)
export const setCurrentPage = (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', payload: { currentPage } } as const)
export const setFilter = (filter: FilterType) => ({ type: 'SET_FILTER', payload: filter } as const)

export const setUsersTotalCount = (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', payload: { totalUsersCount } } as const)
export const toggleIsFetching = (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', payload: { isFetching } } as const)
export const togglefollowingInProgress = (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLOWING_PROGRESS', isFetching, userId } as const)

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionUsersTypes>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionUsersTypes>

export const requestUsers = (page: number,
    pageSize: number, filter:FilterType): ThunkType => async (dispatch: ThunkDispatchType) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page))
    dispatch(setFilter(filter))


    const data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCount(data.totalCount));
};


const followUnfollowFlow = async (dispatch: Dispatch<ActionUsersTypes>,
    userId: number,
    apiMethod: (userId: number) => Promise<AxiosResponse>,
    actionCreator: (userId: number) => ActionUsersTypes) => {
    dispatch(togglefollowingInProgress(true, userId))

    const response = await apiMethod(userId)
    
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(togglefollowingInProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
}

    







