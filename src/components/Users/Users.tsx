import Reacr from 'react'
import { UsersPropsType } from './UsersContainer'
import s from './users.module.css'

export let Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                fullName: 'Petya',
                pfotoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl2D_MvhwlH_AQ5R3EsHaqBjsnJmsbaNg7Yrx1fIuQ&s',
                followed: false,
                status: 'I am a boss',
                location: { city: 'Moscow', country: ' Russia' }
            },
            {
                id: 2,
                fullName: 'Vasiya',
                pfotoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl2D_MvhwlH_AQ5R3EsHaqBjsnJmsbaNg7Yrx1fIuQ&s',
                followed: true,
                status: 'I am a boss',
                location: { city: 'Pskov', country: ' Russia' }
            },
            {
                id: 3,
                fullName: 'Olya',
                pfotoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl2D_MvhwlH_AQ5R3EsHaqBjsnJmsbaNg7Yrx1fIuQ&s',
                followed: false,
                status: 'I am a boss',
                location: { city: 'Yekaterinburg', country: 'Russia' }
            },
        ]
        )
    }
    return (
        <div>
            {
                props.users.map(u => {
                    <div key={u.id}>
                        <span>
                            <div>
                                <img src={u.pfotoUrl} alt="photo" className={s.photo} />
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
                                    {u.fullName}
                                </div>
                                <div>
                                    {u.status}
                                </div>
                            </span>
                            <span>
                                <div>
                                    {u.location.country}
                                </div>
                                <div>
                                    {u.location.city}
                                </div>
                            </span>
                        </span>
                    </div>
                })
            }
        </div>
    )

}