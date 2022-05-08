import { UsersPropsType } from './UsersContainer'
import s from './users.module.css'
import axios from 'axios'
import images from '../../assets/img/images.jpg'
import React from 'react'


export class Users extends React.Component {
          componentDidMount(){
            axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                 // @ts-ignore
            this.props.setUsers(response.data.items)
            });
        }
    render() {
        return <div>
                {
                     // @ts-ignore
            this.props.users.map(u => {
                <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : images} alt="photo" className={s.photo} />
                        </div>
                        <div>
                            {u.followed
                             // @ts-ignore
                                ? <button onClick={() => { this.props.unfollow(u.id) }}>Unfollow</button>
                                // @ts-ignore
                                : <button onClick={() => { this.props.follow(u.id) }}>Follow</button>
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
            })
        }
    </div>
       
    }
}
