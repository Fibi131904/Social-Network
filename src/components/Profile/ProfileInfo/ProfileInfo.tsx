import React, { useState } from 'react';
import { Preloader } from '../../../Preloader';
import { saveProfile } from '../../../redux/profile-reducer';
import userPhoto from '../../../assets/img/userPhoto.jpg';
import styles from './ProfileInfo.module.css';
import { ProfileStatusWithHooks } from './ProfileStatusWithHooks';
import { Button } from 'antd';
import ProfileDataForm from './ProfileDataForm';
import { ProfilePageType, ContactsType } from '../../../types/types';
import fon from '../../../assets/img/fon.jpg'
import { useDispatch } from 'react-redux';



type ProfileInfoPropsType = {
    profile: ProfilePageType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: string) => void
    saveProfile: (profile: ProfilePageType | null) => void
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
    const dispath = useDispatch()
    const [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: { target: any }) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
   
    const onSubmit = (formData: ProfilePageType | null) => {
     
        dispath(saveProfile(formData))
        console.log(formData)
     dispath(setEditMode(false))
    }
    const backFon = {
        backgroundImage: `url(${fon})`,
    }
    return (
        <div className={styles.container}>

            <div className={styles.fonImg} style={backFon}>

                <div className={styles.containerInfo}>
                   <div>
                    <div className={styles.containerPhoto}>
                    <div className={styles.fotoChancge}>
                            {props.isOwner && <input type={'file'}  onChange={onMainPhotoSelected} />}
                        </div>
                        <div className={styles.PhotoBorder}>
                        <img src={props.profile.photos?.large || userPhoto} className={styles.mainPhoto} alt={''} />
                        </div>
                        
                    </div>
                    <div className={styles.status}>
                        <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateStatus} />
                    </div>
                    </div> 
                    <div className={styles.profileContainer}>
                       
                        {editMode
                            ? <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} />
                            : <ProfileData goToEditMode={() => {
                                setEditMode(true)
                            }} profile={props.profile} isOwner={props.isOwner} />}

                    </div>

                </div>

            
            </div>
        </div>
    )
}

type ContactType = {
    contactTitle: string
    contactValue: string
}

type ProfileDataType = {
    profile: ProfilePageType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataType> = ({ profile, isOwner, goToEditMode }) => {
    return <div className={styles.ProfileInfoContainer}>
      
        <div className={styles.itemAbout}>
            <b className={styles.item}>Full name: </b> {profile.fullName}
        </div>
        <div className={styles.itemAbout}>
            <b className={styles.item}>Looking For A Job: </b>{profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
           <div className={styles.itemAbout}>
                <b className={styles.item}>My professional skills: </b> {profile.lookingForAJobDescription}
            </div>}
            <div className={styles.itemAbout}>
            <b className={styles.item}>About Me: </b> {profile.aboutMe}
        </div>
        <div>
            <b className={styles.item}>Contacts: </b> {profile.contacts && Object.keys(profile.contacts).map(key => {

                return <b className={styles.item}><Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} /></b>
            })}
        </div>
        {isOwner && <div>
            <Button onClick={goToEditMode}>edit</Button>
        </div>}
    </div>
}

const Contact: React.FC<ContactType> = ({ contactTitle, contactValue }) => {
    return <div ><b>{contactTitle}: </b> {contactValue}</div>
}



