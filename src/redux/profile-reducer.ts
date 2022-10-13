import { profile } from "console"
import { Dispatch } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { profileAPI, usersAPI } from "../api/api"
import { AppStateType } from "./redux-store"
import { ThunkType } from "./users-reducer"

const ADD_POST = "ADD_POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS= 'SAVE_PHOTO_SUCCESS'

export type ActionType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoSuccess>
    


    export type PostDataType = {
        id: number
        message: string
        likeCount: number
    }
    export type ProfilePageType = {
        aboutMe: string
        contacts: ContactsType
        lookingForAJob: boolean
        lookingForAJobDescription: string
        fullName: string
        userId: number
        photos: PhotosType
    }
    
    export type PhotosType = {
        small: string
        large: string
    }
    
    export type ContactsType = {
        facebook: string
        website: string
        vk: string
        twitter: string
        instagram: string
        youtube: string
        github: string
        mainLink: string
    }
export type InitialStateType = typeof initialState

const initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likeCount: 15 },
        { id: 2, message: 'Hi!', likeCount: 11 },
        { id: 3, message: 'Hello', likeCount: 20 },
        { id: 4, message: 'Yes', likeCount: 2 }
    ] as Array<PostDataType>,
    profile: null as ProfilePageType | null,
    status: '' as string,
    }


export const profileReducer = (state:  InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: 
        let newPost = {
            id: 6,
            message: action.newPostText,
            likeCount: 0,
        };
        return {
            ...state,
            posts: [...state.posts, newPost],
        };
                
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
            case SAVE_PHOTO_SUCCESS:
                return {
                ...state,
                profile: {...state.profile!, photos: action.photos}
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
export const savePhotoSuccess = (photos: PhotosType) => {
    return {
        type: 'SAVE_PHOTO_SUCCESS',
        photos
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
export const savePhoto = (file: string): ThuhkType => async (dispatch: ThunkDispatchType) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

