import React from 'react';
import styles from './User.module.css'
import { NavLink } from 'react-router-dom';
import { UserType } from '../../redux/users-reducer';
import userPhoto from '../../assets/img/userPhoto.jpg'


type PropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
}

export const User: React.FC<PropsType> = React.memo(({ user, followingInProgress, follow, unfollow }) => {
    return (
        <div className={styles.UserContainer}>


            <div >
                <NavLink to={'/profile/' + user.id}>
                    <img className={styles.Userphoto} src={user.photos?.small != null ? user.photos.small : userPhoto} alt={`user's avatar`}
                    />
                </NavLink>
            </div>

            <div>
                <div className={styles.userName}>{user.name}</div>
                <div>{user.status}</div>
            </div>      

            <div>
                <div>{user.location?.country}</div>
                <div>{user.location?.city}</div>
             </div>

                <div>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => { unfollow(user.id) }}>
                        Unfollow
                    </button>
                    : <button disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => { follow(user.id) }}>
                        Follow
                    </button>}
            </div>

           

        </div>
    );
});