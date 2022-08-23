import React from 'react';
import { ProfilePageType } from '../../redux/profile-reducer';
import { MyPostsContainer } from './MyPost/MyPostsContainer';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';



type ProfileType = {
  profile: ProfilePageType
  status: string
  updateStatus: (status: string) => void
}

export const Profile = (props: ProfileType) => {


  return (
    <div>
      <ProfileInfo profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus} />
      <MyPostsContainer />
    </div>
  );

}

