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
            console.log(resultEvent)
            this.setState({ profile_image: resultEvent.info.url })
        }
    }

    render() {
        let widget
        if (window.cloudinary) {
            widget = window.cloudinary.createUploadWidget(
                {
                    cloudName: `${process.env.REACT_APP_cloudName}`,
                    uploadPreset: `${process.env.REACT_APP_uploadPreset}`,
                    sources: ["local", "url", "facebook", "instagram"],
                    cropping: true,
                    cropping_aspect_ratio: 1,
                    show_skip_crop_button: false,
                    Default: false
                },
                (error, result) => {
                    this.checkUploadResult(error, result)
                    this.checkUploadResult(error, result)
                })
        }
        return (
            <div>
                <input name="first_name" placeholder="First Name" value={this.state.first_name} onChange={this.handleChange} />
                <input name="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.handleChange} />
                <input name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                <button name="profile_image" onClick={() => widget.open()}>Pick a Pic!</button>
                <input name="profile_description" placeholder="Profile Description" value={this.state.profile_description} onChange={this.handleChange} />
                <input name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                <Link to="/home">
                <button onClick={this.handleRegister}>Register</button>
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