import React from 'react';
import { MyPostsContainer } from './MyPost/MyPostsContainer';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';



type ProfileType={}

 export const Profile = (props: ProfileType) => {
 
 
  return (
    <div>
      <ProfileInfo/>
      <MyPostsContainer/>
    </div>
  );

}

