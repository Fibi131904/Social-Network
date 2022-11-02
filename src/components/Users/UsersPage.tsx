import React from 'react'
import { useSelector } from 'react-redux'
import { Preloader } from '../../Preloader'
import { getIsFetching } from '../../redux/users-selectors'
import { Users } from './Users'




 export const UsersPage: React.FC = (props) => {

    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}





