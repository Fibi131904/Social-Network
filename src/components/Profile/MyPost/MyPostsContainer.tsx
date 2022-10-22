import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addPostAC} from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import { PostDataType } from '../../../types/types';
import MyPosts from './MyPosts';

type mapStateToPropsType = {
  posts: Array<PostDataType>
 }

type mapDispatchToPropsType = {
  addPost: (newPostText:string) => void

}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
   
  }
}
const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
  return {
    addPost: (newPostText:string) => {
       dispatch(addPostAC(newPostText)) },
      }
}

export const MyPostsContainer = connect<mapStateToPropsType,mapDispatchToPropsType,{},AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);



