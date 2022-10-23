import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { follow, setCurrentPage, unfollow, togglefollowingInProgress, UserType, FilterType, requestUsers } from '../../redux/users-reducer'
import { Users } from './Users'
import { Preloader } from '../../Preloader'
import { compose } from 'redux'
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getPortionSize, getUsers, getUsersFilter } from '../../redux/users-selectors'



export type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    portionSize: number
    filter: FilterType
}

export type MapToDispatchPropsType =
    {
        getUsers: (currentPage: number, pageSize: number, filter:FilterType) => void
        follow: (userId: number) => void
        unfollow: (userId: number) => void
    }
export type UsersPropsType = MapStateToPropsType & MapToDispatchPropsType



class UsersContainer extends React.Component<UsersPropsType>{

    componentDidMount() {
        const { currentPage, pageSize, filter } = this.props
        this.props.getUsers(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNunber: number) => {
        const { pageSize, filter } = this.props
        this.props.getUsers(pageNunber, pageSize, filter)
    }
    onFilterChanged = (filter: FilterType) => {
        const { pageSize } = this.props
        this.props.getUsers(1, pageSize, filter)
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
                onFilterChanged={this.onFilterChanged}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                followThunkCreator={this.props.follow}
                unfollowThunkCreator={this.props.unfollow}
            />
        </>
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state),
        filter: getUsersFilter(state)
    }
}


export default compose<ComponentType>(
    connect(mapStateToProps, {

        setCurrentPage, togglefollowingInProgress, getUsers: requestUsers, follow, unfollow
    })
)(UsersContainer)
