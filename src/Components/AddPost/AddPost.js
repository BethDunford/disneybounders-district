import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../redux/reducers/postsReducer';
import { getSession } from '../../redux/reducers/authReducer';
import { withRouter, Link } from 'react-router-dom';
require("dotenv").config();

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

    checkUploadResult = (error, resultEvent) => {
        if (resultEvent.event === 'success') {
            this.setState({ img: resultEvent.info.url })
        }
    }

    render() {
        let widget
        if (window.cloudinary) {
            widget = window.cloudinary.createUploadWidget(
                {
                    cloudName: `${process.env.REACT_APP_cloudName}`,
                    uploadPreset: `${process.env.REACT_APP_uploadPreset}`,
                    sources: ["local", "url", "facebook", "instagram"],
                    Default: false
                },
                (error, result) => {
                    this.checkUploadResult(error, result)
                    this.checkUploadResult(error, result)
                })
        }
        return (
            <div className="add-post-background">
                <div className="add-post-container">
                    <div className="form-3">
                        <h1>Hang a DisneyBound In Your Closet</h1>
                        <button className="add-post-button-1" name="img" onClick={() => widget.open()}>Pick a Pic!</button>
                        <input className="input-field" name="caption" placeholder="Caption" value={this.state.caption} onChange={this.handleChange} />
                        <Link to="/home">
                            <button className="add-post-button-2" onClick={this.handleAddPost}>Hang Your DisneyBound</button>
                        </Link>
                    </div>
                </div>
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