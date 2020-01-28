import React, { Component } from 'react';
import EditPost from "../EditPost/EditPost";
import { connect } from "react-redux";
import { getSession } from '../../redux/reducers/authReducer';
import { deletePost } from '../../redux/reducers/postsReducer';

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

    render() {
        return (
                <div className="disneybound-container">
                    <div className="disneybound-container-content" key={this.props.post_id}>
                        <div id="profile-info">
                            <img className="disneybound-profile-image" src={this.props.profile_image} alt="Profile"></img>
                            <h3 className="disneybound-username">{this.props.username}</h3>
                        </div>
                        <img className="disneybound-image" src={this.props.img} alt='DisneyBound'></img>
                        <h5 className="disneybound-caption">{this.props.caption}</h5>
                        {this.props.user === this.props.user_id ?
                            <div>
                                <EditPost caption={this.props.caption} post_id={this.props.post_id} />
                                <button onClick={() => this.props.deletePost(this.props.post_id, this.props.user_id)}>Delete</button>
                            </div>
                            : null}
                    </div>
                </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.authReducer.user_id,
        posts: reduxState.postsReducer.posts
    }
}

export default connect(mapStateToProps, { getSession, deletePost })(DisneyBound);