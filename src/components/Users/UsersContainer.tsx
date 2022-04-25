
import Reacr from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppStateType } from '../../redux/redux-store'
import { followAC, setUsersAC, unfollowAC, UserType } from '../../redux/users-reducer'
import { Users } from './Users'

type MapStateToPropsType = {
    users: Array<UserType>
}
type MapToDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
}
export type UsersPropsType = MapStateToPropsType & MapToDispatchPropsType


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users
    }
}


const mapDispatchToProps = (dispatch:Dispatch):MapToDispatchPropsType => {
    return {
        follow: (userID:number) => dispatch(followAC(userID)),
        unfollow:(userID:number) => dispatch(unfollowAC(userID)),
        setUsers:(users:Array<UserType>) => dispatch(setUsersAC(users))
    }
}


export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
