import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { follow, setCurrentPage, unfollow, togglefollowingInProgress, UserType, requestUsers } from '../../redux/users-reducer'
import { Users } from './Users'
import { Preloader } from '../../Preloader'
import { compose } from 'redux'
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getPortionSize, getUsers} from '../../redux/users-selectors'






class UsersContainer extends React.Component<UsersPropsType>{

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
          }

    onPageChanged = (pageNunber: number) => {
        this.props.requestUsers(pageNunber, this.props.pageSize)
    }
    render() {

        return <>
            {this.props.isFetching ? <Preloader /> : ''}
            <Users
                totalItemsCount={this.props.totalUsersCount}
                portionSize={this.props.portionSize}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                followThunkCreator={this.props.follow}
                unfollowThunkCreator={this.props.unfollow}  
                            />
        </>
    }
}

// const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//         portionSize: state.usersPage.portionSize
//     }
// }
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state)
    }
}


type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    portionSize: number
}

type MapToDispatchPropsType =
    {
        setCurrentPage: (pageNunber: number) => void
        togglefollowingInProgress: (isFetching: boolean, userId: number) => void,
        requestUsers: (currentPage: number, pageSize: number) => void
        follow: (userId: number) => void
        unfollow: (userId: number) => void
    }
export type UsersPropsType = MapStateToPropsType & MapToDispatchPropsType



export default compose<ComponentType>(
    connect(mapStateToProps, {
        follow, unfollow, setCurrentPage, togglefollowingInProgress, getUsers:requestUsers
    })
)(UsersContainer)
