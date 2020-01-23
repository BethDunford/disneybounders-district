async function editProfile(req, res) {
    const { profile_image, profile_description } = req.body;
    const user_id = +req.params.user_id;
    const db = req.app.get("db");
    const editedProfile = await db.profile.editProfile([
        profile_image,
        profile_description,
        user_id
    ])
    req.session.user = {
        user_id: editedProfile[0].user_id,
        first_name: editedProfile[0].first_name,
        last_name: editedProfile[0].last_name,
        username: editedProfile[0].username,
        profile_image: editedProfile[0].profile_image,
        profile_description: editedProfile[0].profile_description
        }
        res.status(200).json(req.session.user);
}

// async function deleteProfile(req,res) {
//     const user_id = +req.params.user_id;
//     const db = req.app.get("db");
//     const deletedProfile = await db.profile.deleteProfile([user_id])
//     res.status(200).json(deletedProfile);
// }

module.exports = {
    editProfile,
    // deleteProfile
}