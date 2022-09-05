import React, { ComponentType } from 'React'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppStateType } from '../redux/redux-store'

type mapStateToPropsForRedirectPropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): mapStateToPropsForRedirectPropsType => ({
    isAuth: state.auth.isAuth
}) as mapStateToPropsForRedirectPropsType

export function uthRedirect<T>(Component: ComponentType<T>) {

    class RedirectComponent extends React.Component<mapStateToPropsForRedirectPropsType> {

        render() {
            let { isAuth, ...restProps } = this.props //типизация
            if (!isAuth) return <Redirect to='/login' />

            return <Component {...restProps as T} />
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}