CREATE TABLE users(
    user_name VARCHAR(64) NOT NULL,
    password_hash VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    isAdmin boolean NOT NULL,

    PRIMARY KEY (user_name)
);


      