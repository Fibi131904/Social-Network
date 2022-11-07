import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';
    


  const Navbar = () => {
      return (

        <nav className={style.nav}>
          <div className={style.item} >
          <NavLink to="/profile" activeClassName={style.active}>Profile</NavLink>
          </div>
          <div className={style.item}>
            <NavLink to='/dialogs'activeClassName={style.active}>Messages</NavLink>
          </div>
          <div className={style.item}>
            <NavLink to='/users'activeClassName={style.active}>Users</NavLink>
          </div>
          <div className={style.item}>
            <NavLink to='news'>News</NavLink>
          </div>
          <div className={style.item}>
            <NavLink to='/music'> Music</NavLink>
          </div>
          <div className={style.item}>
            <NavLink to='/settings'>Settings</NavLink>
          </div>
          <div className={style.item}>
          <NavLink to='/frends'>Frends</NavLink>
          </div>
        </nav>
      )
 }



 export default Navbar;