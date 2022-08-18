import React from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { follow, setCurrentPage, setUsersTotalCount, setUsers, toggleIsFetching, unfollow, UserType } from '../../redux/users-reducer'
import axios from 'axios'
import { Users } from './Users'
import { Preloader } from '../../Preloader'







class UsersContainer extends React.Component<UsersPropsType>{

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
        {
            withCredentials: true
        })
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setUsersTotalCount(response.data.totalCount)
            });
    }

    onPageChanged = (pageNunber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNunber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNunber}&count=${this.props.pageSize}`,
        { 
            withCredentials: true
        })
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            });
    }
    render() {

        return <> {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow} isFetching={false} />
        </>
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


// const mapDispatchToProps = (dispatch: Dispatch): MapToDispatchPropsType => {
//     return {
//         follow: (userID: number) => dispatch(followAC(userID)),
//         unfollow: (userID: number) => dispatch(unfollowAC(userID)),
//         setUsers: (users: Array<UserType>) => dispatch(setUsersAC(users)),
//         setCurrentPage: (pageNunber: number) => dispatch(setCurrentPageAC(pageNunber)),
//         setUsersTotalCount: (totalUsersCount: number) => dispatch(setUsersTotalCountAC(totalUsersCount)),
//         toggleIsFetching: (isFetching: boolean) => dispatch(toggleIsFetchingAC(isFetching))
//     }
// }

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



export default connect(mapStateToProps, {
    follow, unfollow, setUsers, setCurrentPage, setUsersTotalCount, toggleIsFetching
})(UsersContainer)
