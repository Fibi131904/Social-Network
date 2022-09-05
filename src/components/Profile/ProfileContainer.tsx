import { connect } from 'react-redux'
import React, { ComponentType } from 'react';
import { AppStateType } from '../../redux/redux-store';
import { Profile } from './Profile';
import { ProfilePageType, getUserProfile, updateUserStatus, getUserStatus } from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';

type PathParamsType = {
  userId: string
}
type MapStatePropsType = {
  profile: ProfilePageType
  status: string
 
}

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateUserStatus: (status: string) => void
}
type OnPropsType = MapStatePropsType & MapDispatchPropsType;


type PropsType = RouteComponentProps<PathParamsType> & OnPropsType;



class ProfileContainer extends React.Component<PropsType>{
  componentDidMount() {

    let userId = +this.props.match.params.userId || 23699;

    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId)

  }
  render() {
    
    return (

      <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateUserStatus}/>

    );
  }
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status
 }) as MapStatePropsType




//export default connect(mapStateToProps,{getUserProfile})(WithUrlDataContainerComponent);
export default compose<ComponentType>(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
  withRouter,
  )(ProfileContainer)
