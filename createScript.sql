DROP tables IF EXISTS

CREATE DATABASE mydatabase;

CREATE TABLE userslist
(user_id INTEGER(45),
 unique_id INTEGER(200),
 fname VARCHAR(255),
 lname VARCHAR(255),
 email VARCHAR(255), 
 password VARCHAR(255),   
 status VARCHAR(255));