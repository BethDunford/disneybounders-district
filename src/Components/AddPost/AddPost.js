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
        // console.log(resultEvent)
        if (resultEvent.event === 'success') {
            console.log('upload success huzzah!')
            console.log(resultEvent.info.url)
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
                    sources: ["local", "facebook", "instagram"],
                    cropping: true,
                    cropping_aspect_ratio: 1,
                    show_skip_crop_button: true,
                    Default: false
                },
                (error, result) => {
                    this.checkUploadResult(error, result)
                    this.checkUploadResult(error, result)
                })
        }
        return (
            <div>
                <h1>Add a DisneyBound</h1>
                <input name="caption" placeholder="Caption" value={this.state.caption} onChange={this.handleChange} />
                <button name="img" onClick={() => widget.open()}>Choose Image</button>
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