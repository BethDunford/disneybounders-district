DELETE FROM posts
WHERE post_id = $1;
SELECT * FROM posts
ORDER BY post_id DESC;