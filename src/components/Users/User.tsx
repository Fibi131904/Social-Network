import React from 'react';
import style from './User.module.css'
import {NavLink} from 'react-router-dom';
import { UserType } from '../../redux/users-reducer';
import userPhoto from '../../assets/img/userPhoto.jpg'


type PropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: number[]
}

export const User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos?.small != null ? user.photos.small : userPhoto} alt={`user's avatar`}
                             className={style.photo}/>
                        </NavLink>
                    </div>
                    <div>
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
                </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{user.location?.country}</div>
                    <div>{user.location?.city}</div>
                </span>
            </span>
        </div>
    );
};