import React, { Component } from 'react';
import EditProfile from "../EditProfile/EditProfile";
import { getAllMyPosts } from "../../redux/reducers/postsReducer";
import { connect } from 'react-redux';
import { getSession } from '../../redux/reducers/authReducer';

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            editProfile: false
        }
    }

    componentDidMount() {
        this.props.getAllMyPosts();
    }

    handleOpenEditProfile = () => {
        this.setState({ editProfile: true })
    }

    render() {
        const { posts } = this.state;
        const myPostsMapped = posts.map((post, i) => {
            return (
                <div key={i} user_id={this.props.post.user_id} style={{ border: '1px solid black', maxWidth: '50%' }}>
                    <h5>{this.props.post.profile_image}</h5>
                    <h3>{this.props.post.username}</h3>
                    <h4>{this.props.post.profile_description}</h4>
                    {this.props.user === this.props.user_id ?
                        <div>
                            <EditProfile 
                            profile_image={post.profile_image}
                            profile_description={post.profile_image}
                            />
                        </div>
                        : null}
                </div>
            )
        })
        return (
            <div>
                <h1>{this.props.username}</h1>
                {myPostsMapped}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.profileReducer.user_id,
        posts: reduxState.postsReducer.posts
    }
}

export default connect(mapStateToProps, { getSession, getAllMyPosts })(UserProfile);