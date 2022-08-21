import { connect } from 'react-redux'
import React, { ComponentType } from 'react';
import { AppStateType } from '../../redux/redux-store';
import { Profile } from './Profile';
import { ProfilePageType, getUserProfile } from '../../redux/profile-reducer';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';



type MapStatePropsType = {
  profile: ProfilePageType
  isAuth: boolean
}
type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
}
type OnPropsType = MapStatePropsType & MapDispatchPropsType;

type PathParamsType = {
  userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & OnPropsType;



class ProfileContainer extends React.Component<PropsType>{
  componentDidMount() {

    let userId = +this.props.match.params.userId || 2;

    this.props.getUserProfile(userId)

  }
  render() {
    if (!this.props.isAuth) return <Redirect to='/login' />
    return (


      <Profile {...this.props} profile={this.props.profile} />

    );
  }
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth
}) as MapStatePropsType

const WithUrlDataContainerComponent = withRouter(ProfileContainer)



//export default connect(mapStateToProps,{getUserProfile})(WithUrlDataContainerComponent);
export default compose<ComponentType>(
  connect(mapStateToProps, { getUserProfile }))(WithUrlDataContainerComponent)
