import axios from 'axios';
import { connect } from 'react-redux'
import React from 'react';
import { AppStateType } from '../../redux/redux-store';
import { Profile } from './Profile';
import { ProfileApiType, setUserProfile } from '../../redux/profile-reducer';







 class ProfileContainer extends React.Component<PropsType>{
  componentDidMount(){
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data)
               
            });
  }
  render() {

    return (
  
        <Profile {...this.props} profile={this.props.profile}/>
   
    );
  }
 }
type MapStatePropsType = {
  profile: ProfileApiType
}
type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileApiType) => void
  }
type PropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps=(state:AppStateType):MapStatePropsType =>({
  profile:state.profilePage.profile
})
export default connect(mapStateToProps,{setUserProfile})(ProfileContainer);