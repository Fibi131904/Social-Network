import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { follow, setCurrentPage, unfollow, togglefollowingInProgress, getUsers, UserType } from '../../redux/users-reducer'
import { Users } from './Users'
import { Preloader } from '../../Preloader'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'





class UsersContainer extends React.Component<UsersPropsType>{

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
        //         this.props.toggleIsFetching(true)
        // userAPI.getUsers(this.props.currentPage, this.props.pageSize)
        // .then(data=>{
        //             this.props.toggleIsFetching(false)
        //             this.props.setUsers(data.items)
        //             this.props.setUsersTotalCount(data.totalCount)
        //         });
    }

    onPageChanged = (pageNunber: number) => {
        this.props.getUsers(pageNunber, this.props.pageSize)
    }
    render() {

        return <>
            {this.props.isFetching ? <Preloader /> : ''}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}



type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapToDispatchPropsType =
    {
        setCurrentPage: (pageNunber: number) => void
        togglefollowingInProgress: (isFetching: boolean, userId: number) => void,
        getUsers: (currentPage: number, pageSize: number) => void
        follow: (userId: number) => void
        unfollow: (userId: number) => void
    }
export type UsersPropsType = MapStateToPropsType & MapToDispatchPropsType

let withRedirect= withAuthRedirect(UsersContainer)

export default compose<ComponentType>(
    connect(mapStateToProps, {
        follow, unfollow, setCurrentPage, togglefollowingInProgress, getUsers
    }))(withRedirect)
