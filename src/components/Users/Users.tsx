import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterType, requestUsers } from "../../redux/users-reducer";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getPortionSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import { Pagination } from "../common/Pagination/Pagination";
import { User } from "./User";
import { UsersSearchForm } from "./UsersSearchForm";
import style from './User.module.css'






export const Users: React.FC = React.memo((props) => {

    const users = useSelector(getUsers)
    const totalItemsCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)
    const portionSize = useSelector(getPortionSize)

    const dispatch = useDispatch()
   

    
    
    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNunber: number) => {
        dispatch(requestUsers(pageNunber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Pagination
                pageSize={pageSize}
                totalUsersCount={totalItemsCount}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                portionSize={portionSize}
            />
            <div className={style.users}>
                {users.map(u => <User user={u}
                    follow={follow}
                    key={u.id}
                    unfollow={unfollow}
                    followingInProgress={followingInProgress}
                />
                )}
            </div>
        </div>
    )
})

