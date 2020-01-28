import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/reducers/authReducer';
import { withRouter, Link } from 'react-router-dom';
require("dotenv").config();

class Register extends Component {
    constructor() {
        super();
        this.state = {
            first_name: "",
            last_name: "",
            username: "",
            profile_image: "",
            profile_description: "",
            password: ""
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleRegister = () => {
        const { registerUser } = this.props;
        const { first_name, last_name, username, profile_image, profile_description, password } = this.state;
        registerUser({ first_name, last_name, username, profile_image, profile_description, password })
    }

    checkUploadResult = (error, resultEvent) => {
        if (resultEvent.event === 'success') {
            this.setState({ profile_image: resultEvent.info.url })
        }
    }

    render() {
        let widget
        if (window.cloudinary) {
            widget = window.cloudinary.createUploadWidget(
                {
                    cloudName: `${process.env.REACT_APP_cloudName}`,
                    uploadPreset: `${process.env.REACT_APP_profileUploadPreset}`,
                    sources: ["local", "url", "facebook", "instagram"],
                    Default: false
                },
                (error, result) => {
                    this.checkUploadResult(error, result)
                    this.checkUploadResult(error, result)
                })
        }
        return (
            <div className="form">
                <input className="input-field" name="first_name" placeholder="First Name" value={this.state.first_name} onChange={this.handleChange} />
                <input className="input-field"  name="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.handleChange} />
                <button className="register-buttons" name="profile_image" onClick={() => widget.open()}>Pick a Pic!</button>
                <input className="input-field"  name="profile_description" placeholder="Profile Description" value={this.state.profile_description} onChange={this.handleChange} />
                <input className="input-field"  name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                <input className="input-field"  type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                <Link to="/home">
                <button className="register-buttons" onClick={this.handleRegister}>Register</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.authReducer.user_id
    }
}

export default withRouter (connect(mapStateToProps, { registerUser })(Register));