import React, { ComponentType } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reduser';
import { AppStateType } from './redux/redux-store';
import { Preloader } from './Preloader';
import { withSuspense } from './hoc/withSuspense';
import ProfileContainer from './components/Profile/ProfileContainer';

const DialogsContainer= React.lazy(()=> import('./components/Dialogs/DialogsContainer'));




type MapToDispatchPropsType = {
    initializeApp: () => void
}
type MapStateToPropsType = {
    initialized: boolean
}

export type AppType = MapToDispatchPropsType & MapStateToPropsType;

class App extends React.Component<AppType>{

    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer />
                <Navbar />
                <div className={'app-wrapper-content'}>
                    <Route path={"/dialogs"} render={withSuspense(DialogsContainer)} />
                    <Route path={"/profile/:userId?"} render={() => <ProfileContainer/>}/>
                    <Route path={"/users"} render={() => <UsersContainer />} />
                    <Route path={"/login"} render={() => <Login />} />
                </div>
            </div>
        );
    }
}
const MapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})


export default compose<ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapToDispatchPropsType, {}, AppStateType>(MapStateToProps, { initializeApp }))(App);








