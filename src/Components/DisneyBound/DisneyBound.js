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

    render(){
        return (
            <div key={this.props.post_id} style={{border: '1px solid black', maxWidth: '50%'}}>
                    <h2>{this.props.profile_image}</h2>
                    <h3>{this.props.username}</h3>
                    <h4>{this.props.img}</h4>
                    <h5>{this.props.caption}</h5>
                {this.props.user === this.props.user_id ?
                <div>
                    <EditPost caption={this.props.caption} post_id={this.props.post_id}/>
                    <button onClick={() => this.props.deletePost(this.props.post_id, this.props.user_id)}>Delete</button>
                </div>
                : null}
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