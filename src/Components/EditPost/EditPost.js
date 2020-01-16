import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPost } from '../../redux/reducers/postsReducer';

class EditPost extends Component {
    constructor() {
        super();
        this.state = {
            caption: ""
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleEditPost = (post_id) => {
        const { caption } = this.state;
        const { editPost } = this.props;
        const updated_post = {
            caption
        }
        editPost(post_id, updated_post)
    }

    render() {
        return (
            <div>
                <h1>Edit DisneyBound Caption</h1>
                <input name="caption" placeholder="Caption" value={this.state.caption} onChange={this.handleChange}/>
                <button onClick={this.handleEditPost}>Save Changes</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        posts: reduxState.postsReducer.posts
    }
}

export default connect(mapStateToProps, { editPost })(EditPost);