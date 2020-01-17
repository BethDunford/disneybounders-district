INSERT INTO posts (caption, img, user_id)
VALUES ($1, $2, $3);

SELECT p.*, u.username, u.profile_image FROM posts p
INNER JOIN users u
on p.user_id = u.user_id
ORDER BY p.post_id DESC;