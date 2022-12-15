import React, { ComponentType } from 'react'
import './App.css'
import 'antd/dist/antd.css';
import { Link, Route, withRouter } from 'react-router-dom'
import { UsersPage } from './components/Users/UsersPage'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { initializeApp } from './redux/app-reduser'
import { AppStateType } from './redux/redux-store'
import { Preloader } from './Preloader'
import { withSuspense } from './hoc/withSuspense'
import ProfileContainer from './components/Profile/ProfileContainer'
import { LoginForm } from './components/Login/Login'
import {  Breadcrumb , Layout, Menu } from 'antd'
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons'
import { AppHeader } from './components/Header/Header'

const { SubMenu } = Menu
const { Content, Sider, Footer } = Layout

const DialogsContainer = React.lazy(
  () => import('./components/Dialogs/DialogsContainer')
)

type MapToDispatchPropsType = {
  initializeApp: () => void
}

type MapStateToPropsType = {
  initialized: boolean
}

export type AppType = MapToDispatchPropsType & MapStateToPropsType

class App extends React.Component<AppType> {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <Layout>
       <AppHeader/>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}>
                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                  <Menu.Item key="1"> <Link to="/profile">Profile</Link></Menu.Item>
                  <Menu.Item key="2"><Link to='/dialogs'>Messages</Link></Menu.Item>
                  <Menu.Item key="3">nav 3</Menu.Item>
                  <Menu.Item key="4">nav 4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                  <Menu.Item key="1"><Link to='/developers'>Developers</Link></Menu.Item>
                  <Menu.Item key="2">nav 2</Menu.Item>
                  <Menu.Item key="3">nav 3</Menu.Item>
                  <Menu.Item key="4">nav 4</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  icon={<NotificationOutlined />}
                  title="subnav3">
                  <Menu.Item key="1">nav 1</Menu.Item>
                  <Menu.Item key="2">nav 2</Menu.Item>
                  <Menu.Item key="3">nav 3</Menu.Item>
                  <Menu.Item key="4">nav 4</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px'}}>
              <Route
                path={'/dialogs'}
                render={withSuspense(DialogsContainer)}
              />
              <Route
                path={'/profile/:userId?'}
                render={() => <ProfileContainer />}
              />
              <Route path={'/developers'} render={() => <UsersPage />} />
              <Route path={'/login'} render={() => <LoginForm />} />
            </Content>
          </Layout>
        </Content>
        <Footer style={{textAlign: 'center'}}>Social Network 2022</Footer>
          </Layout>
      
    )
  }
}

const MapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})

export default compose<ComponentType>(
  withRouter,
  connect<MapStateToPropsType, MapToDispatchPropsType, {}, AppStateType>(
    MapStateToProps,
    { initializeApp }
  )
)(App)

