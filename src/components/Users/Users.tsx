import React from "react";
import { FilterType, UserType } from "../../redux/users-reducer";
import { Pagination } from "../common/Pagination/Pagination";
import { User } from "./User";
import { UsersSearchForm } from "./UsersSearchForm";

type PropsType = {
    users: Array<UserType>
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    followingInProgress: Array<number>
    followThunkCreator: (userId: number) => void
    unfollowThunkCreator: (userId: number) => void
    portionSize: number
}


export const Users =React.memo( (props: PropsType)=> {
    return (
        <div>
            <UsersSearchForm onFilterChanged= {props.onFilterChanged} />
            <Pagination
                pageSize={props.pageSize}
                totalUsersCount={props.totalItemsCount}
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
                portionSize={props.portionSize}
            />
            {props.users.map(u => <User user={u}
                follow={props.followThunkCreator}
                key={u.id}
                unfollow={props.unfollowThunkCreator}
                followingInProgress={props.followingInProgress}
            />
            )
            }
        </div>
    )
}
)