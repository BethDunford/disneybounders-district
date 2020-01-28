import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSession } from '../../redux/reducers/authReducer';
import { editProfile } from '../../redux/reducers/profileReducer';
import { withRouter, Link } from 'react-router-dom';
require("dotenv").config();

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            profile_image: "",
            profile_description: ""
        }
    }

    componentDidMount(){
        this.props.getSession()
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleEditProfile = () => {
        const { profile_image, profile_description } = this.state;
        const { editProfile } = this.props;
        const updated_profile = {
            profile_image,
            profile_description
        }
        editProfile(this.props.user_id, updated_profile)
    }

    checkUploadResult = (error, resultEvent) => {
        if (resultEvent.event === 'success') {
            this.setState({ profile_image: resultEvent.info.url })
            alert("Save changes please!")
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
            <div>
                <h4>Clean Your Closet</h4>
                <button name="profile_image" onClick={() => widget.open()}>Pick a new pic!</button>
                <input name="profile_description" placeholder="Profile Description"  onChange={this.handleChange}/>
                <Link to="/bounder/:username">
                <button onClick= {this.handleEditProfile}>Save Changes</button>
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

export default withRouter(connect(mapStateToProps, { getSession, editProfile })(EditProfile));