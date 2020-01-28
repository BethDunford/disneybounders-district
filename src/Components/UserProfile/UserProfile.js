import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllMyPosts } from "../../redux/reducers/postsReducer";
import { getSession } from '../../redux/reducers/authReducer';
import EditProfile from "../EditProfile/EditProfile";
import DisneyBound from "../DisneyBound/DisneyBound";
// import { deleteProfile } from "../../redux/reducers/profileReducer";

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            editProfile: false
        }
    }

    componentDidMount() {
        this.props.getSession();
        this.props.getAllMyPosts(this.props.username);
    }

    handleOpenEditProfile = () => {
        this.setState({ editProfile: true })
    }

    render() {
        const { posts } = this.props;
        const postsMapped = posts.map((post, i) => {
            return (
                <div>
                    <div className="profile-posts-map" key={this.props.user_id}>
                        <DisneyBound
                            user={post.user_id}
                            profile_image={post.profile_image}
                            username={post.username}
                            img={post.img}
                            caption={post.caption}
                            post_id={post.post_id}
                        />
                    </div>
                </div>
            )
        })
        return (
            <div id="profile-main">
                <h1>Welcome to Your Closet!</h1>
                <div className="profile-picture-and-username">
                    <img src={this.props.profile_image} alt="Profile"></img>
                    <h3 className="profile-page-username"> {this.props.username}</h3>
                </div>
                <h4 className="profile-page-description"> {this.props.profile_description}</h4>
                <div>
                    {this.props.user_id ?
                        <div>
                            <EditProfile
                                profile_image={this.props.profile_image}
                                profile_description={this.props.profile_description} />
                        </div>
                        : null}
                </div>
                <section id="profile-page">
                    {postsMapped}
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.authReducer.user_id,
        posts: reduxState.postsReducer.posts,
        username: reduxState.authReducer.username,
        profile_image: reduxState.authReducer.profile_image,
        profile_description: reduxState.authReducer.profile_description
    }
}

export default connect(mapStateToProps, { getAllMyPosts, getSession })(UserProfile);