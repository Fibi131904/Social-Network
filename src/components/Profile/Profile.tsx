import React from 'react';
import { StoreType } from '../redux/store';
import MyPostsContainer from './MyPost/Posts/MyPostsContainer';
import ProfileInfo from './MyPost/ProfileInfo/ProfileInfo';


type ProfileType={
  store:StoreType
}

 export const Profile = (props: ProfileType) => {
 
 
  return (
    <div>
      <ProfileInfo/>
      <MyPostsContainer store={props.store} dispatch={props.dispatch} />
    </div>
  );

}

