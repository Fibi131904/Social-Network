import { connect } from 'react-redux'
import React, { ComponentType } from 'react';
import { AppStateType } from '../../redux/redux-store';
import { Profile } from './Profile';
import { ProfilePageType, getUserProfile } from '../../redux/profile-reducer';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


type MapStatePropsType = {
  profile: ProfilePageType
 
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
    
    return (


      <Profile {...this.props} profile={this.props.profile} />

    );
  }
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
 }) as MapStatePropsType




let withRedirect= withAuthRedirect(ProfileContainer)


//export default connect(mapStateToProps,{getUserProfile})(WithUrlDataContainerComponent);
export default compose<ComponentType>(
  connect(mapStateToProps, { getUserProfile }))(withRedirect)
