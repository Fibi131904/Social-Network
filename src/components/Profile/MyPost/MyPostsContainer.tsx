import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addPostAC, PostDataType, updateNewPostTextAC } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import MyPosts from './MyPosts';

type mapStateToPropsType = {
  posts: Array<PostDataType>
  newPostText: string
}
type mapDispatchToPropsType = {
  addPost: () => void
  updateNewPostText: (text: string) => void
}
export type MyPostPropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}
const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
  return {
    addPost: () => { dispatch(addPostAC()) },
    updateNewPostText: (text: string) => {
      dispatch(updateNewPostTextAC(text))

    }
  }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)



