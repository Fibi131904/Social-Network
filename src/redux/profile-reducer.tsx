import { Dispatch } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { profileAPI, usersAPI } from "../api/api"
import { AppStateType } from "./redux-store"
import { ThunkType } from "./users-reducer"

const ADD_POST = "ADD_POST"
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = 'SET_STATUS'

export type ActionType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    


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
        { id: 1, message: 'Hi, how are you?', likesCount: 20 }
    ] as Array<PostDataType>,
    newPostText: 'it-kamasutra.com',
    profile: null as ProfilePageType | null,
    status: '' as string,
    }


export const profileReducer = (state:  InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: 
            let newPost = {
                id: 4,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state, posts: [...state.posts, newPost],
                newPostText: ''
            }
        
        case UPDATE_NEW_POST_TEXT: 
            return {
                ...state,
                newPostText: action.newText
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
        

        default:
            return state;

    }
}
export const addPostAC = () => {
    return {
        type: ADD_POST,
    } as const
}
export const updateNewPostTextAC = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
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
export type ThuhkType = ThunkAction<void, AppStateType, unknown, ActionType>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionType>


export const getUserProfile = (userId: number)=> (dispatch: Dispatch) => {
    return usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))

        })
}

export const getUserStatus = (userId:number): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data));
            })
    }
}

export const updateUserStatus = (status: string): ThuhkType => {
    return (dispatch: ThunkDispatchType) => {
        profileAPI.updateStatus(status)
            .then(response => {
                console.log(status)
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
    }
}