import React, { useState, useEffect } from 'react'
import Header from '../Main/Header'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import './Login.css'


const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState([])
    const [isSubmited, setIsSubmitted] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const IsEnable = user.password.length > 0 ? true : false;
    const InputHandler = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ValidateInput()) {
            setIsSubmitted(true);
        }
    }

    useEffect(() => {
        if (isSubmited) {
            setIsSubmitted(false);
            //console.log(user)
           //  axios.post('http://localhost:9111/loan/api/login', user)
            axios.post('http://localhost:8060/loan-api/apiGate/login/',user)
                .then(response => {
                    if (response.status === 200) {
                        localStorage.setItem("auth", response.data.jwt);
                        localStorage.setItem("roles", response.data.roles);
                        setRedirect(true);
                        console.log(response.data.roles[0]);
                    }
                    else {
                        alert("Login not successful. Please try after some time!!!")
                    }
                })
                .catch(error => {
                    console.log(error.response)
                    alert("Login not successful. Please try after some time!!!")
                }
                )
        }
    }, [isSubmited])
    const ValidateInput = () => {
        let errorsArray = [];
        const { username, password } = user;
        if (!username) {
            errorsArray.emailAddress = "Email Address is required"
        }
        else if (!/^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(username)) {
            errorsArray.emailAddress = "Invalid email address"
        }
        if (password.length < 8) {
            errorsArray.password = "Passwords must be at least 8 characters long"
        }
        setErrors({ ...errorsArray })

        return (Object.keys(errorsArray).length === 0);
    }
    if (redirect) {
        return (<Redirect to="/Search" />);
    }
    else {
        return (
            <div>
                <Header />
                <form className="form-1" autoComplete="off" onSubmit={handleSubmit}>

                <h2><span className="log-in">Log in</span></h2>

                <div>
                    <label>Email address</label>
                    <input type="text" name="username" onChange={InputHandler} placeholder="Enter email" />
                    <p className="Validation">{errors.emailAddress}</p>
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={InputHandler} placeholder="Enter password" />
                    <p className="Validation">{errors.password}</p>
                </div>
                <button type="submit" disabled={!IsEnable}>Submit</button>

            </form>
            </div>);
    }
}

export default Login 