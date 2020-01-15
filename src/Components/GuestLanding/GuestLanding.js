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
            <div>
                <h1>Welcome to DisneyBounders Direct</h1>
                New Bounder? Please register below!
                <Register />
                Welcome back!
                <Login />
            </div>
        )
    }
}

export default GuestLanding;