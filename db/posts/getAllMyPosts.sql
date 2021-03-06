SELECT p.*, u.username, u.profile_image, u.profile_description FROM posts p
INNER JOIN users u
on u.user_id = p.user_id
WHERE u.username = $1
ORDER BY p.post_id DESC;