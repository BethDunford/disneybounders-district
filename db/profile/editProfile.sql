UPDATE users
SET profile_image = $1,
    profile_description = $2
WHERE user_id = $3;
SELECT * FROM users
WHERE user_id = $3;