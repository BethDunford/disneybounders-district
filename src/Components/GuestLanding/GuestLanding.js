import React, { Component } from 'react';
import Login from "../Login/Login";
import Register from "../Register/Register";

class GuestLanding extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="guest-landing-container">
                <div className="register-login-container">
                    <h1>Welcome to DisneyBounders District</h1>
                    <h2>New Bounder? Please register below!</h2>
                <Register />
                    <h2 id="login">Welcome back, login below!</h2>
                <Login />
                </div>
            </div>
        )
    }
}

export default GuestLanding;