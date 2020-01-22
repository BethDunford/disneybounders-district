import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../redux/reducers/postsReducer';
import { getSession } from '../../redux/reducers/authReducer';
import { withRouter, Link } from 'react-router-dom';
import { CloudinaryContext, Image } from 'cloudinary-react';
// import { fetchPhotos, url, openUploadWidget } from '../../../public/utils/CloudinaryService';
import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'disneybounders-district',
    api_key: '433346987376378',
    api_secret: 'C2uH4ZiqUy5ndQdqQJoGE0vD6fg'
})

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

    checkUploadResult = (resultEvent) => {
        if (resultEvent.event === 'success') {
            console.log(this.props.currentUser.id);
            this.props.postPhoto({
                user_id: this.props.currentUser.id,
                caption: '',
                url: resultEvent.info.secure_url
            })
                .then(this.props.history.push(`/home`))
        }
    }

    showWidget = (widget) => {
        widget.open()
    }

    render() {
        let widget = window.cloudinary.createUploadWidget({
            cloudName: "disneybounders-district",
            uploadPreset: "mhpqhdoq"},
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                }
            }
        )
        document.getElementById("upload_widget").addEventListener("click", function(){
            widget.open();
        }, false);
        return (
            <div>
                <h1>Add a DisneyBound</h1>
                <input name="caption" placeholder="Caption" value={this.state.caption} onChange={this.handleChange} />
                <input name="img" placeholder="Image" value={this.state.img} onChange={this.handleChange} />
                <Link to="/home">
                    <button onClick={this.showWidget}>Add a DisneyBound</button>
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