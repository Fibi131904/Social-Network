import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import Header from './Header';



type MapToDispatchPropsType = {
   logout:()=> void
}
type MapStateToPropsType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}
export type HeaderContainerType = MapStateToPropsType & MapToDispatchPropsType



class HeaderContainer extends React.Component<HeaderContainerType>{
 

  render(): React.ReactNode {
    return <Header
    userId={this.props.userId}
    login={this.props.login}
    logout={this.props.logout}
    email={this.props.email}
    isAuth={this.props.isAuth}
     />
  }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  userId: state.auth.userId,
  email: state.auth.email,
  login: state.auth.login,
  isAuth: state.auth.isAuth
})




export default compose<ComponentType>(connect(mapStateToProps, {logout }))(HeaderContainer);