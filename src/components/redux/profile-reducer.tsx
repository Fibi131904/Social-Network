import { ProfilePageType, ActionType, PostType } from "./store";

const ADD_POST = "ADD_POST"
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT"

export const profileReducer = (state: ProfilePageType, action: ActionType) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 6,
                message: state.newPostText,
                likesCount: 0,
            };
            let stateCopy = { ...state }
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(newPost)
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = { ...state }

            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        default:
            return state;
    }
}

export let addPostAC = (postMessage: string) => {
    return {
        type: 'ADD_POST',
        newPostText: postMessage
    } as const
}
export let updateNewPostTextAC = (text: string) => {
    return {
        type: 'UPDATE_NEW_POST_TEXT',
        newText: text
    } as const
}
