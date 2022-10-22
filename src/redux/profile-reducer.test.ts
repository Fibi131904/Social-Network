import { PostDataType,  ProfilePageType  } from "../types/types";
import { addPostAC, deletePost, profileReducer } from "./profile-reducer";

const initialState = {
    messageForNewPost: '',
    posts: [
        { id: 1, message: 'Ho ho', likesCount: 4 },
        { id: 2, message: 'yo ho', likesCount: 15 },
        { id: 3, message: 'Hello', likesCount: 20 },
        { id: 4, message: 'Yes', likesCount: 2 }
    ] as Array<PostDataType>,
    profile: {} as ProfilePageType,
    status: '' as string,
}

test('length of post should be incremented', () => {
    //1. test date
    let action = addPostAC('it-kamasutra.com');

    //2. action
    let newState = profileReducer(initialState, action);
    //3. expect
    expect(newState.posts.length).toBe(5)
});

test('message of new post should be it-kamasutra.com', () => {
    //1. test date
    let action = addPostAC('it-kamasutra.com');

    //2. action
    let newState = profileReducer(initialState, action);
    //3. expect
    expect(newState.posts[4].message).toBe('it-kamasutra.com')
});

test('after deleting kength of message should be decrement', () => {
    //1. test date
    let action = deletePost(1);

    //2. action
    let newState = profileReducer(initialState, action);
    //3. expect
    expect(newState.posts.length).toBe(3)
});
