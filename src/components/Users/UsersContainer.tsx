
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppStateType } from '../../redux/redux-store'
import { followAC, setCurrentPageAC, setUsersTotalCountAC, setUsersAC, toggleIsFetchingAC, unfollowAC, UserType } from '../../redux/users-reducer'
import axios from 'axios'
import { Users } from './Users'





class UsersContainer extends React.Component {

    componentDidMount() {
        // @ts-ignore
        // this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                // @ts-ignore
                // this.props.toggleIsFetching(false)
                // @ts-ignore
                this.props.setUsers(response.data.items)
                // @ts-ignore
                this.props.setTotalUsersCount(response.data.totalCount)

            });
    }

    onPageChanged = (pageNunber: number) => {
        // @ts-ignore
        this.props.setCurrentPage(pageNunber)
        // @ts-ignore
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNunber}&count=${this.props.pageSize}`)
            .then(response => {
                // @ts-ignore
                this.props.toggleIsFetching(false)
                // @ts-ignore
                this.props.setUsers(response.data.items)
            });
    }
    render() {

        return <Users 
        // @ts-ignore
        totalUsersCount={this.props.totalUsersCount}
        // @ts-ignore
        pageSize={this.props.pageSize}
        // @ts-ignore
        currentPage={this.props.currentPage}
        // @ts-ignore
        onPageChanged={this.onPageChanged}
        // @ts-ignore
        users={this.props.users}
        // @ts-ignore
        follow={this.props.follow}
        // @ts-ignore
        unfollow={this.props.unfollow}
        />
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}


const mapDispatchToProps = (dispatch:Dispatch):MapToDispatchPropsType => {
    return {
        follow: (userID:number) => dispatch(followAC(userID)),
        unfollow:(userID:number) => dispatch(unfollowAC(userID)),
        setUsers:(users:Array<UserType>) => dispatch(setUsersAC(users)),
        setCurrentPage: (pageNunber:number) => dispatch(setCurrentPageAC(pageNunber)),
        setUsersTotalCount: (totalUsersCount:number) => dispatch(setUsersTotalCountAC(totalUsersCount)),
        toggleIsFetching: (isFetching:boolean) => dispatch(toggleIsFetchingAC(isFetching))
        }
    }

    type MapStateToPropsType = {
        users: Array<UserType>
        pageSize: number
        totalUsersCount: number
        currentPage: number
        isFetching: boolean
    }
    
     type MapToDispatchPropsType = 
    {
        follow: (userId: number) => void
        unfollow: (userId: number) => void
        setUsers: (users: Array<UserType>) => void
        setCurrentPage: (pageNunber: number) => void
        setUsersTotalCount: (totalUsersCount: number) => void
        toggleIsFetching: (isFetching: boolean) => void
    }
    export type UsersPropsType = MapStateToPropsType & MapToDispatchPropsType



export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
