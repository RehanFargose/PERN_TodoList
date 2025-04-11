CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    content VARCHAR(100) NOT NULL
);


SELECT * FROM todo 