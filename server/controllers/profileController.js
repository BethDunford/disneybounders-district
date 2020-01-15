async function editProfile(req, res) {
    const { profile_image, profile_description } = req.body;
    const user_id = req.session.user.user_id;
    const db = req.app.get("db");
    const editedProfile = await db.profile.editProfile([
        profile_image,
        profile_description,
        user_id
    ])
    res.status(200).json(editedProfile);
}

module.exports = {
    editProfile
}