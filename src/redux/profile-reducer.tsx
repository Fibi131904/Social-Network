import { Dispatch } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { profileAPI, usersAPI } from "../api/api"
import { AppStateType } from "./redux-store"
import { ThunkType } from "./users-reducer"

const ADD_POST = "ADD_POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'

export type ActionType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePost>
    


export type PostDataType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    } | null
}
export type InitialStateType = typeof initialState

const initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 15 },
        { id: 2, message: 'Hi!', likesCount: 11 },
        { id: 3, message: 'Hello', likesCount: 20 },
        { id: 4, message: 'Yes', likesCount: 2 }
    ] as Array<PostDataType>,
    profile: null as ProfilePageType | null,
    status: '' as string,
    }


export const profileReducer = (state:  InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: 
            let newPost = {
                id: 4,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state, posts: [...state.posts, newPost]
            }
                
        case SET_USER_PROFILE: 
            return {
                ...state,
                profile: action.profile
            }
        
        case SET_STATUS: 
            return {
                ...state,
               status: action.status
            }
        case DELETE_POST: 
            return {
                ...state,
               posts: state.posts.filter(p=> p.id!== action.postId)
            }
        

        default:
            return state;

    }
}
export const addPostAC = (newPostText:string) => {
    return {
        type: ADD_POST,
        newPostText
    } as const
}

const setUserProfile = (profile: ProfilePageType) => {
    return {
        type: 'SET_USER_PROFILE',
        profile: profile
    } as const
}
const setStatus = (status: string) => {
    return {
        type: 'SET_STATUS',
        status: status
    } as const
}
export const deletePost = (postId: number) => {
    return {
        type: 'DELETE_POST',
        postId
    } as const
}
export type ThuhkType = ThunkAction<void, AppStateType, unknown, ActionType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionType>


export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateUserStatus = (status: string): ThuhkType => async (dispatch: ThunkDispatchType) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

