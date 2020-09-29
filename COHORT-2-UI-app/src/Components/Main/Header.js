import React,{useEffect} from 'react'
import './Main.css'
import { Link } from 'react-router-dom'
import isLogin from './IsLogin'

const Header = () => {
    useEffect(() => {
        isLogin()
       
    })
    const LogoutHandler = () => {
        localStorage.clear()
    }
    return (
        <div className='header'>
            <h1>Loan Management System</h1>
            {isLogin() ? <Link to={"/"} onClick={LogoutHandler} className='link'> Logout </Link> : null}
        </div>
    );


};

export default Header

