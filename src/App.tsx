import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import { Login } from './components/Login/Login';
import DialogsContainer from './components/Dialogs/DialogsContainer';




type AppPropsType={}


const App: React.FC<AppPropsType> = ({}) => {
  return (
      <BrowserRouter>
          <div className={'app-wrapper'}>
              <HeaderContainer/>
              <Navbar/>
              <div className="app-wrapper-content">
                  <Route exact path={"/dialogs"} render={() => <DialogsContainer />} />
                  <Route exact path={"/profile/:userId?"} render={() => <ProfileContainer />} />
                  <Route exact path={"/users"} render={() => <UsersContainer/>} />
                  <Route exact path={"/login"} render={() => <Login/>} />
              </div>
          </div>
      </BrowserRouter>
  );
}
 
 
//  const News = () => {
//       return (
//      <div>
//        News
//      </div>
//    )
//  }
//  const Music = () => {
//    return (
//      <div>
//        Music
//      </div>
//    )
//  }
//  const Settings = () => {
//    return (
//      <div>
//        Settings
//      </div>
//    )
//  }



export default App;







