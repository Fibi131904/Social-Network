import { Dispatch } from "redux"
import { stopSubmit } from "redux-form"
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
        likesCount: number     
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
        { id: 1, message: 'Ho ho', likesCount: 4 },
        { id: 2, message: 'yo ho', likesCount: 15 },
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
            id: 6,
            message: action.newPostText,
            likesCount: 0,
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

export const addPostAC = (newPostText: string) => ({ type: ADD_POST, newPostText } as const)
export const setUserProfile = (profile: ProfilePageType | null) => ({ type: 'SET_USER_PROFILE', profile: profile } as const)
export const setStatus = (status: string) => ({ type: 'SET_STATUS', status: status } as const)
export const deletePost = (postId: number) => ({ type: 'DELETE_POST', postId } as const)
export const savePhotoSuccess = (photos: PhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', photos } as const)


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
export const saveProfile = (profile: ProfilePageType | null): ThunkType => async (dispatch: ThunkDispatchType, getState) => {
    debugger
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
         // @ts-ignore
        dispatch(getUserProfile(userId))
    } else {
         // @ts-ignore
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
}