const ADD_POST = "ADD_POST"
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT"
const SET_USER_PROFILE = "SET_USER_PROFILE"

export type ActionType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof setUserProfile>

export type ProfilePageType = {
    posts: Array<PostDataType>
    newPostText: string
    profile:ProfileApiType 

}
export type PostDataType = {
    id: number
    message: string
    likesCount: number
}
export type ProfileApiType= {
    userId: number
    lookingForAJob:boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos:photosType
}
type contactsType={
    github: string
    vk: string
    facebook:string
    instagram: string
    twitter:string
    website: string
    youtube:string
    mainLink: string  
}
type photosType={
  small:string  
  large: string
}

const initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 15 },
        { id: 2, message: 'Hi, how are you?', likesCount: 20 }
    ] as Array<PostDataType>,
    newPostText: 'it-kamasutra.com',
    profile: {
        userId: 1,
        lookingForAJob:true,
        lookingForAJobDescription: 'string',
        fullName: "string",
        contacts: {
            github: 'string',
            vk: 'string',
            facebook:'string',
            instagram: 'string',
            twitter:'string',
            website: 'string',
            youtube:'string',
            mainLink: 'string ' ,
        },
        photos:{small:'string',
        large: 'string' }
    }
}

export const profileReducer = (state:ProfilePageType = initialState, action: ActionType) => {
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
        case  SET_USER_PROFILE: {
            return {
                ...state,
               profile: action.profile 
            }
        }

        default:
            return state;

    }
}
export let addPostAC =() => {
    return {
        type: ADD_POST,
        } as const
}
export let updateNewPostTextAC = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    } as const
}
export let setUserProfile = (profile:ProfileApiType) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}
