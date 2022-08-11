import Reacr from 'react'
import s from './users.module.css'
import images from '../../assets/img/images.jpg'
import { UserType } from '../../redux/users-reducer'





export let Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize) //округление до большего

    let pages = []
    for (let i = 0; i <= pagesCount; i++) {
        pages.push(i)
    }
    
    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? s.selectPage : ''}

                    onClick={(e) => {
                        // @ts-ignore
                        props.onPageChanged(p)
                    }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : images} alt="photo" className={s.photo} />
                    </div>
                    <div>
                        {u.followed

                            ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>

                            : <button onClick={() => { props.follow(u.id) }}>Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>
                            {u.name}
                        </div>
                        <div>
                            {u.status}
                        </div>
                    </span>
                    <span>
                        <div>
                            {'u.location.country'}
                        </div>
                        <div>
                            {'u.location.city'}
                        </div>
                    </span>
                </span>
            </div>
            )
        }

    </div>


}


export type UsersPropsType = {
    totalUsersCount: number
    users: Array<UserType>
    pageSize: number
    currentPage: number
    onPageChanged: () => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void

}
