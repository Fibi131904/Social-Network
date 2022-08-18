import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { setAuthUserData } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import Header from './Header';

 
  class HeaderContainer extends React.Component<HeaderContainerType>{
    componentDidMount() {
           axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,{
            withCredentials:true
           })
          .then(response => {
         
            if (response.data.resultCode === 0){
              let {id, email, login}= response.data.data
            this.props.setAuthUserData( id, email, login)
            }

          });
  }

    render(): React.ReactNode {
      return <Header authData={this.props} />
    
    }
  }
const mapStateToProps=(state: AppStateType): AuthDataType=>({
  id: state.auth.id,
  email: state.auth.email,
  login: state.auth.login,
  isAuth: state.auth.isAuth
})   

export type AuthDataType= {
  id: number | null,
    email: string,
    login: string,
    isAuth: boolean,
}
type MapToDispatchPropsType={
  setAuthUserData:(userId:number, email:string,login:string)=>void
}
export type HeaderContainerType= AuthDataType & MapToDispatchPropsType





export default connect(mapStateToProps,{setAuthUserData})(HeaderContainer);