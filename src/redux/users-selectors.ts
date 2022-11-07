import { createSelector } from 'reselect'
import { AppStateType } from './redux-store'
import { UserType } from './users-reducer'

const getUsersSelector = (state: AppStateType): Array<UserType> => {
  return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter((u) => true)
})

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress
}

export const getPortionSize = (state: AppStateType) => {
  return state.usersPage.portionSize
}
export const getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter
}
