import React from 'react';
import { ProfilePageType } from '../../types/types';
import { MyPostsContainer } from './MyPost/MyPostsContainer';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';



type ProfileType = {
  profile: ProfilePageType
  status: string
  updateStatus: (status: string) => void
  isOwner:boolean
  savePhoto: (file: string) => void
  saveProfile: (profile: ProfilePageType | null) => void
}
 

export const Profile = (props: ProfileType) => {

  return (
    <div>
      <ProfileInfo
        savePhoto={props.savePhoto}
        isOwner={props.isOwner} profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus} 
        saveProfile={props.saveProfile}
        />
      <MyPostsContainer />
    </div>
  );
}
