const bcrypt = require("bcryptjs");

async function user(req, res) {
    if (req.session.user) {
        res.status(200).json(req.session.user)
    }
}

async function registerUser(req, res) {
    const { first_name, last_name, username, profile_image, profile_description, password } = req.body;
    const db = req.app.get("db");

    const foundUser = await db.auth.checkForUsername(username)

    if (foundUser[0]) {
        res.status(401).json("That username is already taken!")
    } else {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt)
        const newUser = await db.auth.registerUser([
            first_name,
            last_name,
            username,
            profile_image,
            profile_description,
            hash
        ])
        req.session.user = {
            user_id: newUser[0].user_id,
            first_name: newUser[0].first_name,
            last_name: newUser[0].last_name,
            username: newUser[0].username,
            profile_image: newUser[0].profile_image,
            profile_description: newUser[0].profile_description
        }
        console.log(req.session.user);
        res.status(200).json(req.session.user)
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;
    const db = req.app.get("db");

    const foundUser = await db.auth.checkForUsername(username)

    if (!foundUser[0]) {
        res.status(400).json("Username or password is incorrect.")
    } else {
        const isAuthenticated = bcrypt.compareSync(password, foundUser[0].hash)
        if (!isAuthenticated) {
            res.status(403).json("Password is incorrect.")
        } else {
            req.session.user = {
                user_id: foundUser[0].user_id,
                first_name: foundUser[0].first_name,
                last_name: foundUser[0].last_name,
                username: foundUser[0].username,
                profile_image: foundUser[0].profile_image,
                profile_description: foundUser[0].profile_description
            }
        }
        console.log(req.session.user);
        res.status(200).json(req.session.user)
    }
}

async function logoutUser(req, res) {
    req.session.destroy;
    res.sendStatus(200);
}

module.exports = {
    user,
    registerUser,
    loginUser,
    logoutUser
}