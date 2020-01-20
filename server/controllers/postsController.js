async function allPosts(req, res) {
    const db = req.app.get("db");
    const posts = await db.posts.getAllPosts();
    res.status(200).json(posts)
}

async function addPost(req, res) {
    const { caption, img } = req.body;
    const user_id = req.session.user.user_id;
    const db = req.app.get("db");
    const addedPost = await db.posts.addPost([caption, img, user_id]);
    res.status(200).json(addedPost);
}

async function editPost(req, res) {
    const { caption } = req.body;
    const post_id = +req.params.post_id;
    // const user_id = req.session.user.user_id;
    const db = req.app.get("db");
    const editedPost = await db.posts.editPost([
        caption,
        // user_id,
        post_id
    ])
    res.status(200).json(editedPost);
}

async function deletePost(req, res) {
    const post_id = +req.params.post_id;
    const db = req.app.get("db");
    const updatedPosts = await db.posts.deletePost([post_id])
    res.status(200).json(updatedPosts);
}

async function allMyPosts(req, res) {
    const username = req.params.username;
    const db = req.app.get("db");
    const posts = await db.posts.getAllMyPosts(username)
    res.status(200).json(posts);
}

module.exports = {
    allPosts,
    addPost,
    editPost,
    deletePost,
    allMyPosts
}