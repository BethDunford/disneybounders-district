UPDATE posts
SET caption = $1
    date_posted = CURRENT_TIMESTAMP
WHERE user_id = $2 AND post_id = $3;