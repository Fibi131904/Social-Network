import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
    


  const Navbar = () => {
      return (

        <nav className={styles.nav}>
          <div className={styles.item}>
            <NavLink to='news'>News</NavLink>
          </div>
          <div className={styles.item}>
            <NavLink to='/music'> Music</NavLink>
          </div>
          <div className={styles.item}>
            <NavLink to='/settings'>Settings</NavLink>
          </div>
          <div className={styles.item}>
          <NavLink to='/frends'>Frends</NavLink>
          </div>
        </nav>
      )
 }



 export default Navbar;