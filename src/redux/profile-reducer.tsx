const ADD_POST = "ADD_POST"
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT"

export type ActionType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>

export type ProfilePageType = {
    posts: Array<PostDataType>
    newPostText: string
}
export type PostDataType = {
    id: number
    message: string
    likesCount: number
}

const initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 15 },
        { id: 2, message: 'Hi, how are you?', likesCount: 20 }
    ] as Array<PostDataType>,
    newPostText: ''
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
