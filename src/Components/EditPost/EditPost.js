import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPost } from '../../redux/reducers/postsReducer';

class EditPost extends Component {
    constructor() {
        super();
        this.state = {
            caption: "",
            post_id: null
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        let post = {
            caption: this.state.caption,
        }
        return (
            <div>
                <h3>Edit DisneyBound Caption</h3>
                <input name="caption" placeholder="Caption" onChange={this.handleChange}/>
                <button onClick={() => this.props.editPost(post, this.props.post_id)}>Save Changes</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        post_id2: reduxState.postsReducer.post_id
    }
}

export default connect(mapStateToProps, { editPost })(EditPost);