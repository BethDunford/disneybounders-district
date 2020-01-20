import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSession } from '../../redux/reducers/authReducer';
import { editProfile } from '../../redux/reducers/profileReducer';

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

    render() {
        return (
            <div>
                <h1>Edit Your Profile</h1>
                <input name="profile_image" placeholder="Profile Image"  onChange={this.handleChange}/>
                <input name="profile_description" placeholder="Profile Description"  onChange={this.handleChange}/>
                <button onClick= {this.handleEditProfile}>Save Changes</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.authReducer.user_id
    }
}

export default connect(mapStateToProps, { getSession, editProfile })(EditProfile);