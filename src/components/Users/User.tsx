import React from 'react';
import style from './User.module.css'
import { NavLink } from 'react-router-dom';
import { UserType } from '../../redux/users-reducer';
import userPhoto from '../../assets/img/userPhoto.jpg'


type PropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: number[]
}

export const User: React.FC<PropsType> = ({ user, followingInProgress, follow, unfollow }) => {
    return (
        <div className={style.UsersContainer}>

            <div className={style.userItem}>
                <div className={style.photoBlock}>
                    <NavLink to={'/profile/' + user.id}>
                        <img className={style.photo} src={user.photos?.small != null ? user.photos.small : userPhoto} alt={`user's avatar`}
                        />
                    </NavLink>
                </div>
                <div className={style.userProfile}>
                    <div className={style.userName}>{user.name}
                    </div>

                    <div className={style.userInfo}>
                        <div>{user.status}</div>
                        <div>{user.location?.country}</div>
                        <div>{user.location?.city}</div>
                    </div>
                    <div className={style.button}>
                    </div>
                    {user.followed
                        ?
                        <button
                            disabled={followingInProgress
                                .some(id => id === user.id)} onClick={() => {
                                    unfollow(user.id)
                                }}>Unfollow</button>
                        :
                        <button
                            disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                follow(user.id)
                            }}>Follow
                        </button>}
                </div>

            </div>
            
        </div>
    );
};