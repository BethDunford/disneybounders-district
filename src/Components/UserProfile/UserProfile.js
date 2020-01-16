import React, { Component } from 'react';
import EditProfile from "../EditProfile/EditProfile";
import { connect } from 'react-redux';
import { getSession } from '../../redux/reducers/authReducer';

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            editProfile: false
        }
    }

    handleOpenEditProfile = () => {
        this.setState({ editProfile: true })
    }

    render(){
        return (
            <div>
                <ul>
                    <li>{this.props.profile_image}</li>
                    <li>{this.props.username}</li>
                    <li>{this.props.profile_description}</li>
                </ul>
                {this.props.user === this.props.user_id ? 
                <div>
                    <EditProfile />
                </div>
                : null}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.profileReducer.user_id
    }
}

export default connect(mapStateToProps, { getSession })(UserProfile);