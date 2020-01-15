import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPosts } from "../../redux/reducers/postsReducer";
import { DisneyBound } from "../DisneyBound/DisneyBound";

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
        console.log(this.props.posts)
        const { posts } = this.props;
        const postsMapped = posts.map((post,i) => {
            return(
                <div key={i}>
                    <DisneyBound user={post.user_id} profile_image={post.profile_image} username={post.username} img={post.img} caption={post.caption} date_posted={post.date_posted} />
                </div>
            )
        })
        return(
            <div>
                <h1>Home</h1>
                {postsMapped}
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