import React from 'react';
import { Preloader } from '../../../Preloader';
import { ProfilePageType } from '../../../redux/profile-reducer';
import { ProfileStatus } from './ProfileStatus';



type ProfileInfoType = {
  profile: ProfilePageType
  status: string
  updateStatus: (status:string)=> void
}

export const ProfileInfo = (props: ProfileInfoType) => {
  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div>

      <div >
        <img alt="photos" src={props.profile.photos?.large} />
      </div>

      <ProfileStatus status={props.status} updateUserStatus={props.updateStatus} />

      
      <div>Контакты: {props.profile.contacts.facebook}</div>
      <div> {props.profile.lookingForAJob}</div>
      <div>Полное имя: {props.profile.fullName}</div>
      <div>В поиске работы: {props.profile.lookingForAJobDescription}</div>
    </div>
  );

}

