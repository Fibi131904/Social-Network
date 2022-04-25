
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"

export type UserType = {
    id: number
    fullName: string
    pfotoUrl: string
    followed: boolean
    status: string
    location: UsersLocation
}
type UsersLocation = {
    city: string
    country: string
}

let initionState: UsersStateType = {
    users: []

}
export type UsersStateType = {
    users: Array<UserType>
}

export const usersReducer = (state: UsersStateType = initionState, action: ActionType):UsersStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.payload.usersId ? {...u, followed:true} : u)}
        }
        case UNFOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.payload.usersId ? {...u, followed:false} : u)}
        }
        case SET_USERS: {
            return {...state, users: [...state.users, ...action.payload.users]}
        }
        default: {
            return state
        }
    }
}
type followACType=ReturnType<typeof followAC>
type unfollowACType=ReturnType<typeof unfollowAC>
type setUsersACType= ReturnType<typeof setUsersAC>
type ActionType= followACType| unfollowACType| setUsersACType


export const followAC = (usersId: number) => {
    return {
        type: FOLLOW,
        payload: { usersId }
    } as const
}
export const unfollowAC = (usersId: number) => {
    return {
        type: UNFOLLOW,
        payload: { usersId }
    } as const
}
export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: SET_USERS,
        payload: { users }

    } as const
}
