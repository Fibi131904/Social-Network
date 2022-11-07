import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from'./Header.module.css';


type HeaderPropsType={
  userId: number | null
    login: string | null
    logout: () => void
    email: string | null
    isAuth: boolean
}
  const Header:React.FC<HeaderPropsType> = (props) => {
    return (
    <header className={styles.header}>
        <img src='https://weblinks.ru/wp-content/uploads/2022/04/58.jpeg' alt='заставка'/>
    
    <div className={styles.loginBlock}>
      {props.isAuth 
      ? <div>{ props.login} - <button onClick={props.logout}>Log out</button> </div>
      :<NavLink to={'/login'}>Login</NavLink>}
    </div>
    </header>
    )
};



export default Header;