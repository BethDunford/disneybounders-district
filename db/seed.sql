--create users table
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  username VARCHAR(30) NOT NULL,
  profile_image TEXT NOT NULL,
  profile_description VARCHAR(500) NOT NULL,
  hash TEXT NOT NULL
);

--create posts table
CREATE TABLE posts (
post_id SERIAL PRIMARY KEY,
caption VARCHAR (500) NOT NULL,
date_posted TIMESTAMP NOT NULL,
img TEXT NOT NULL,
user_id INT REFERENCES users(user_id)
);

--checkForUsername
SELECT * FROM users
WHERE username = $1;

--registerUser
INSERT INTO users (first_name, last_name, username, profile_image, profile_description, hash)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

--addPost
INSERT INTO posts (caption, img, user_id)
VALUES ($1, $2, $3);

--getAllPosts | Inner Join
SELECT p.*, u.username, u.profile_image FROM posts p
INNER JOIN users u
on p.user_id = u.user_id
ORDER BY p.post_id DESC;

--editPost
UPDATE posts
SET caption = $1,
WHERE user_id = $2 AND post_id = $3;

--deletePost
DELETE FROM posts
WHERE post_id = $1;
SELECT * FROM posts
ORDER BY post_id DESC;

--getAllMyPosts | Inner Join
SELECT p.*, u.username, u.profile_image FROM posts p
INNER JOIN users u
on u.user_id = p.user_id
WHERE p.user_id = $1
ORDER BY p.post_id DESC;

--editProfile
UPDATE users
SET profile_description = $1,
    profile_image = $2
WHERE user_id = $3;

--Dummy Data
INSERT INTO posts ("New Tinkerbell DisneyBound just posted on Leslie's blog!", "https://66.media.tumblr.com/e1e2353cd6c37afcb118d4808d7a53b0/d4c4189020060b3f-8e/s2048x3072/84af5c44713f3c0919601a848b773dcc93b136c5.jpg", 1)