import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import { Profile } from './components/Profile/Profile';
import { Route } from 'react-router-dom';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import { UsersContainer } from './components/Users/UsersContainer';


type AppPropsType={}


function App(props:AppPropsType) {
  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div>
          <Route exact path='/dialogs' render={()=> <DialogsContainer/>} />
          <Route exact path='/profile' render={()=> <Profile/>} />
          <Route exact path='/users' render={()=> <UsersContainer/>} />
       
        {/* <Routes>
          <Route path='/' element={<DialogsContainer />} />
          <Route path='/profile' element={<Profile store={props.store}/>} />
          <Route path='/users' element={<Users/>} />
        </Routes> */}
      </div>
    </div>
  )
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







