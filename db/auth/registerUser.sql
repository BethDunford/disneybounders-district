INSERT INTO users (first_name, last_name, username, profile_image, profile_description, hash)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;