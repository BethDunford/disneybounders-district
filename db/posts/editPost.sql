UPDATE posts
SET caption = $1,
WHERE user_id = $2 AND post_id = $3;