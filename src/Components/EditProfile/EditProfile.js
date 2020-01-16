import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editProfile } from '../../redux/reducers/profileReducer';

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            profile_image: "",
            profile_description: ""
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleEditProfile = (user_id) => {
        const { profile_image, profile_description } = this.state;
        const { editProfile } = this.props;
        const updated_profile = {
            profile_image,
            profile_description
        }
        editProfile(user_id, updated_profile)
    }

    render() {
        return (
            <div>
                <h1>Edit Your Profile</h1>
                <input name="profile_image" placeholder="Profile Image" value={this.state.profile_image} />
                <input name="profile_description" placeholder="Profile Description" value={this.state.profile_description} />
                <button onClick={this.handleEditProfile}>Save Changes</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.profileReducer.user_id
    }
}

export default connect(mapStateToProps, { editProfile })(EditProfile);