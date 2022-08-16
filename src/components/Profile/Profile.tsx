import React from 'react';
import { ProfileApiType } from '../../redux/profile-reducer';
import { MyPostsContainer } from './MyPost/MyPostsContainer';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';



type ProfileType={
  profile: ProfileApiType
}

 export const Profile = (props: ProfileType) => {
 
 
  return (
    <div>
      <ProfileInfo profile={props.profile} />
      <MyPostsContainer/>
    </div>
  );

}

