import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../src/redux/reducers/postsReducer';

class DeletePost extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleDeletePost = (post_id) => {
        // const { caption } = this.state;
        const { deletePost } = this.props;
        deletePost(post_id)
    }

    render() {
        return (
            <div>
                <h1>Delete Your DisneyBound</h1>
                <button onClick={this.handleDeletePost}>Delete</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        posts: reduxState.postsReducer.posts
    }
}

export default connect(mapStateToProps, { deletePost })(DeletePost);