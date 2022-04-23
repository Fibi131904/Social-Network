import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import {  Route } from 'react-router-dom';
import { Profile } from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { StoreType } from './components/redux/store';

type AppPropsType={
store: StoreType
}

function App(props:AppPropsType) {
  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div>
        <Route>
          <Route path='/' element={<Dialogs />} />
          <Route path='/profile' element={<Profile store={props.store}/>} />
        </Route>
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







