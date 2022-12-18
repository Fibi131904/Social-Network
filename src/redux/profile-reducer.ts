import { FormAction, stopSubmit } from "redux-form"
import { profileAPI } from "../api/profileAPI"
import { PhotosType, PostDataType, ProfilePageType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./redux-store"



const initialState = {
    messageForNewPost: '',
    posts: [
        { id: 1, message: 'Ho ho', likesCount: 4 },
        { id: 2, message: 'yo ho', likesCount: 15 },
        { id: 3, message: 'Hello', likesCount: 20 },
        { id: 4, message: 'Yes', likesCount: 2 }
    ] as Array<PostDataType>,
    profile: {} as ProfilePageType,
    status: ''
}


export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType =>
{
    switch (action.type)
    {
        case 'network/profile/ADD_POST':
            let newPost = {
                id: 6,
                message: action.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                posts: [ ...state.posts, newPost ],
                messageForNewPost: ''
            };

        case 'network/profile/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'network/profile/SET_USER_PHOTOS': {
            if (action.photos)
            {
                return {
                    ...state, profile: { ...state.profile, photos: action.photos }
                }
            }
            return state
        }
        case 'network/profile/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'network/profile/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case 'network/profile/SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: { ...state.profile!, photos: action.photos }
            }
        default:
            return state;
    }
}

export const actions = {
    addPostAC: (newPostText: string) => ({ type: 'network/profile/ADD_POST', newPostText } as const),
    setUserProfile: (profile: ProfilePageType) => ({ type: 'network/profile/SET_USER_PROFILE', profile: profile } as const),
    setUserPhotos: (photos: PhotosType | null) => ({ type: 'network/profile/SET_USER_PHOTOS', photos } as const),
    setStatus: (status: string) => ({ type: 'network/profile/SET_STATUS', status: status } as const),
    deletePost: (postId: number) => ({ type: 'network/profile/DELETE_POST', postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'network/profile/SAVE_PHOTO_SUCCESS', photos } as const)
}


export const getUserProfile = (userId: number | null): ThunkType => async (dispatch) =>
{
    const response = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response.data))
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch) =>
{
    let response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response.data));
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) =>
{
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0)
    {
        dispatch(actions.setStatus(status))
    }
}
export const savePhoto = (file: string): ThunkType => async (dispatch) =>
{
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0)
    {
        dispatch(actions.savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile: ProfilePageType | null): ThunkType => async (dispatch, getState) =>
{
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0)
    {
        dispatch(getUserProfile(userId))
    } else
    {
       
        dispatch(stopSubmit('edit-profile', { _error: response.data.messages[ 0 ] }));
        return Promise.reject(response.data.messages[ 0 ]);
    }
}

export type InitialStateType = typeof initialState
export type ThunkType = BaseThunkType<ActionsType | FormAction>
type ActionsType = InferActionsTypes<typeof actions>
