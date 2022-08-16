import React from 'react';
import { isPrefixUnaryExpression } from 'typescript';
import { Preloader } from '../../../Preloader';
import { ProfileApiType } from '../../../redux/profile-reducer';


type ProfileInfoType={
  profile: ProfileApiType

}

export const ProfileInfo = (props:ProfileInfoType) => {
  if(!props.profile){
    return <Preloader/>
  }
 
  return (
    <div>
      <div >
        <img 
        alt="info"
        src='https://tourweek.ru/file/image?path=uploads/sight/18_t54rAgvvhaQFjUQ5NgTbyOHOpn63n.png&w=940&h=430&fit=crop&s=2a24e865c38975022109fd67b873629c' />
      </div>
      <div >
        <img src={props.profile.photos.large}/>
        </div>
        <div>Контакты: {props.profile.contacts.facebook}</div>
        <div> {props.profile.lookingForAJob}</div>
        <div>Полное имя: {props.profile.fullName}</div>
        <div>В поиске работы: {props.profile.lookingForAJobDescription}</div>
    </div>
  );

}

