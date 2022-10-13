import React, { ChangeEvent } from 'react';
import { Preloader } from '../../../Preloader';
import { ProfilePageType } from '../../../redux/profile-reducer';
import { ProfileStatus } from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/img/userPhoto.jpg';
import style from './ProfileInfo.module.css';



type ProfileInfoType = {
  profile: ProfilePageType
  status: string
  updateStatus: (status:string)=> void
  isOwner:boolean
  savePhoto: (file: string) => void
}

export const ProfileInfo = (props: ProfileInfoType) => {
  if (!props.profile) {
    return <Preloader />
  }
  
  const onMainPhotoSelected = (e: { target: any }) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  return (
    <div>

      <div >
        <img alt="photos" src={props.profile.photos?.large || userPhoto} className={style.mainPhoto} />
      {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
      </div>

      <ProfileStatus status={props.status} updateUserStatus={props.updateStatus} />

      
      <div>Контакты: {props.profile.contacts.facebook}</div>
      <div> {props.profile.lookingForAJob}</div>
      <div>Полное имя: {props.profile.fullName}</div>
      <div>В поиске работы: {props.profile.lookingForAJobDescription}</div>
    </div>
  );

}

