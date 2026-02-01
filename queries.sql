create table if not exists social_users (
  user_id TEXT primary key,
  user_first VARCHAR(50),
  user_second VARCHAR(50),
  user_username VARCHAR(20) NOT NULL UNIQUE,
  user_bio TEXT
);


create table if not exists social_posts (
  post_id INT primary key generated always as identity,
  post_date TIMESTAMP default CURRENT_TIMESTAMP,
  post_content TEXT,
  post_likes INT default 0,
  user_id TEXT references social_users (user_id) ON DELETE CASCADE 
)

create table if not exists social_likes (
  like_id TEXT primary key,
  post_id INT references social_posts (post_id) ON DELETE CASCADE,
  user_id TEXT references social_users (user_id) ON DELETE CASCADE
)

create table if not exists social_follow (
  follow_id TEXT primary key, 
  user_username VARCHAR references social_users (user_username) ON DELETE CASCADE,
  user_id TEXT references social_users (user_id) ON DELETE CASCADE,
  current_user_id TEXT references social_users (user_id) ON DELETE CASCADE
)