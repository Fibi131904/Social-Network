import axios from 'axios';
import { connect } from 'react-redux'
import React from 'react';
import { AppStateType } from '../../redux/redux-store';
import { Profile } from './Profile';
import { ProfileApiType, setUserProfile } from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';






 class ProfileContainer extends React.Component<PropsType>{
    componentDidMount(){
      
      let userId=this.props.match.params.userId || 2;
       
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+ userId)
   
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


let mapStateToProps=(state:AppStateType):MapStatePropsType=>({
  profile:state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

type MapStatePropsType = {
  profile: ProfileApiType
}
type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileApiType) => void
  }
type OnPropsType = MapStatePropsType & MapDispatchPropsType;

type PathParamsType = {
 userId :string
}
type PropsType= RouteComponentProps<PathParamsType> & OnPropsType

export default connect(mapStateToProps,{setUserProfile})(WithUrlDataContainerComponent);