import { Dispatch } from "redux"
import { usersAPI } from "../api/api"

const ADD_POST = "ADD_POST"
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT"
const SET_USER_PROFILE = "SET_USER_PROFILE"

export type ActionType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof setUserProfile>


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
export type InitialStateType = {
    posts: Array<PostDataType>
    newPostText: string
    profile: ProfilePageType

}

const initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 15 },
        { id: 1, message: 'Hi, how are you?', likesCount: 20 }
    ] as Array<PostDataType>,
    newPostText: 'it-kamasutra.com',
    profile: {
        aboutMe: '',
        userId: 1,
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        contacts: {
            github: '',
            vk: '',
            facebook: '',
            instagram: '',
            twitter: '',
            website: '',
            youtube: '',
            mainLink: '',
        },
        photos: {
            small: '',
            large: ''
        }
    }
}

export const profileReducer = (state:  InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state, posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
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
export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    return usersAPI.getUserProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))

        })

}