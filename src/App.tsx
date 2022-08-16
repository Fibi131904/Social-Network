import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';




type AppPropsType={}


const App: React.FC<AppPropsType> = ({}) => {
  return (
      <BrowserRouter>
          <div className={'app-wrapper'}>
              <Header/>
              <Navbar/>
              <div className="app-wrapper-content">
                  <Route exact path={"/dialogs"} render={() => <DialogsContainer />}/>
                  <Route exact path={"/profile"} render={() => <ProfileContainer />} />
                  <Route exact path={"/users"} render={() => <UsersContainer/>} />
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







