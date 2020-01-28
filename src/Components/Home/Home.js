import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPosts } from "../../redux/reducers/postsReducer";
import DisneyBound from "../DisneyBound/DisneyBound";

class Home extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getAllPosts();
    }

    render() {
        const { posts } = this.props;
        const postsMapped = posts.map((post, i) => {
            return (
                <div className="posts-map" key={i}>
                    <DisneyBound
                        user={post.user_id}
                        profile_image={post.profile_image}
                        username={post.username}
                        img={post.img}
                        caption={post.caption}
                        post_id={post.post_id}
                    />
                </div>
            )
        })
        return (
            <div id="home-main">
                    <h1>Welcome to the Hall Closet, where you can view everyone's DisneyBounds!</h1>
                <section id="home-page">
                    {postsMapped}
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        posts: reduxState.postsReducer.posts
    }
}

export default connect(mapStateToProps, { getAllPosts })(Home);