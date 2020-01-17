DELETE FROM posts
WHERE post_id = $1;

SELECT p.*, u.username, u.profile_image FROM posts p
INNER JOIN users u
on p.user_id = u.user_id
ORDER BY p.post_id DESC;