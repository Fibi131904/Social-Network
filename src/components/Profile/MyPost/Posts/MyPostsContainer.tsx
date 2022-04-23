import React from 'react';
import { connect } from 'react-redux';
import { addPostAC, updateNewPostTextAC } from '../../../redux/profile-reducer';
import { ActionType, StateType, StoreType } from '../../../redux/store';
import MyPosts from './MyPosts';


// type  mapDispachToPropsType={
//   updateNewPostText: (text:string) => void
//   addPost: () => void
// }
type MyPostPropsContainerType={
  dispatch: (action: ActionType) => void 
   store:StoreType
}


const MyPostsContainer = (props: MyPostPropsContainerType) => {
  let addPost = () => {
    props.dispatch(addPostAC())
  }
  let onPostChange = (text) => {
    let action = updateNewPostTextAC(text)
    props.dispatch(action)
  }
  return (<MyPosts updateNewPostText={onPostChange}
     addPost={addPost} 
     posts={props.state.profilePage.posts} 
     newPostText={props.state.profilePage.newPostText/>)
  }


// const mapStateToProps = (state: AppStateType) => {
//   posts: state.profilePage.posts,
//     // newPostText: state.profilePage.newPostText
// }
// const mapDispachToProps = (dispatch):mapDispachToPropsType => {
//   return {
//     updateNewPostText: (text) => {
//       let action = updateNewPostTextAC(text)
//       dispatch(action)
//     },
//     addPost: () => {
//       dispatch(addPostAC())

//     }
//   }
// }

// const MyPostsContainer= connect(mapStateToProps, mapDispachToProps)(MyPosts )

export default MyPostsContainer;

