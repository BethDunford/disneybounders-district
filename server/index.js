require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const app = express();
//controllers
const ac = require("./controllers/authController");
const pc = require("./controllers/postsController");
const proc = require("./controllers/profileController");
//dot env
const { SERVER_PORT, DB_STRING, SESSION_SECRET } = process.env;
//middleware
app.use(express.json());
//session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 69 * 60 * 24 * 7
    }
}));
//database connection
massive(DB_STRING).then(db => {
    app.set('db', db);
    console.log('DB connected');
})
//de-structured controllers
const { user, registerUser, loginUser, logoutUser } = ac;
const { allPosts, addPost, editPost, deletePost, allMyPosts } = pc;
const { editProfile } = proc;
//auth endpoints
app.get("/auth/user", user);
app.post("/auth/register", registerUser);
app.post("/auth/login", loginUser);
app.get("/auth/logout", logoutUser);
//posts endpoints
app.get("/api/posts", allPosts);
app.post("/api/posts", addPost);
app.put("/api/posts/:post_id", editPost);
app.delete("/api/posts/:post_id", deletePost);
app.get("/api/posts/:user_id", allMyPosts);
//profile endpoints
app.put("/api/profile/:user_id", editProfile);
//db connection
app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));