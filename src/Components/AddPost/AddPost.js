import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../redux/reducers/postsReducer';
import { getSession } from '../../redux/reducers/authReducer';
import { withRouter, Link } from 'react-router-dom';

class AddPost extends Component {
    constructor() {
        super();
        this.state = {
            caption: "",
            img: "",
            addPost: false
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleAddPost = () => {
        const { caption, img } = this.state;

        const { addPost } = this.props;

        addPost({ caption, img })
    }

    render() {
        return (
            <div>
                <h1>Add a DisneyBound</h1>
                <input name="caption" placeholder="Caption" value={this.state.caption} onChange={this.handleChange} />
                <input name="img" placeholder="Image" value={this.state.img} onChange={this.handleChange} />
                <Link to="/home">
                    <button onClick={this.handleAddPost}>Add a DisneyBound</button>
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

export default withRouter(connect(mapStateToProps, {
    addPost,
    getSession
})(AddPost));