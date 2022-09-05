import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAuthUserData, logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import Header from './Header';



type MapToDispatchPropsType = {
  getAuthUserData: () => void
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
  componentDidMount() {
    this.props.getAuthUserData()
  }

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
  userId: state.auth.data.id,
  email: state.auth.data.email,
  login: state.auth.data.login,
  isAuth: state.auth.resultCode === 0
})




export default compose<ComponentType>(connect(mapStateToProps, { getAuthUserData, logout }))(HeaderContainer);