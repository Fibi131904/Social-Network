import { connect } from 'react-redux'
import React, { ComponentType } from 'react';
import { AppStateType } from '../../redux/redux-store';
import { Profile } from './Profile';
import { getUserProfile, updateUserStatus, getUserStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ProfilePageType } from '../../types/types';




type PathParamsType = {
  userId: string
}

type MapStatePropsType = {
  profile: ProfilePageType
  status: string
  authorizedUserId: number
  isAuth: boolean 
}

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateUserStatus: (status: string) => void
  savePhoto: (file: string) => void
  saveProfile: (profile: ProfilePageType | null) => void
}
type OnPropsType = MapStatePropsType & MapDispatchPropsType;


type PropsType = RouteComponentProps<PathParamsType> & OnPropsType;



class ProfileContainer extends React.Component<PropsType>{

  refreshProfile(){
    let userId = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if(!userId){
        this.props.history.push('/login')
      }
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId)  }
  componentDidMount() {
this.refreshProfile()

  }
  componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.match.params.userId !== prevProps.match.params.userId)
    this.refreshProfile()
  }
  render() {
    
    return (

      <Profile
        savePhoto={this.props.savePhoto}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateUserStatus}
        saveProfile={this.props.saveProfile}
         />
    );
  }
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
   }) as MapStatePropsType




export default compose<ComponentType>(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile }),
  withRouter,
  )(ProfileContainer)
