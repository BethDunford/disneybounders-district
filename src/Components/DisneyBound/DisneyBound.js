import React, { Component } from 'react';
import EditPost from "../EditPost/EditPost";
import { connect } from "react-redux";
import { getSession } from '../../redux/reducers/authReducer';

class DisneyBound extends Component {
    constructor() {
        super();
        this.state = {
            editPost: false
        }
    }

    handleOpenEditPost = () => {
        this.setState({ editPost: true })
    }

    render(){
        return (
            <div>
                <ul>
                    <li>{this.props.profile_image}</li>
                    <li>Username: {this.props.username}</li>
                    <li>Date: {this.props.date_posted}</li>
                    <li>{this.props.img}</li>
                    <li>{this.props.caption}</li>
                </ul>
                {this.props.user === this.props.user_id ?
                <div>
                    <EditPost />
                </div>
                : null}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.authReducer.user_id
    }
}

export default connect(mapStateToProps, { getSession })(DisneyBound);