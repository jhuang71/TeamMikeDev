CREATE SCHEMA PUBLIC;


CREATE TYPE privilege_enum AS enum ('student', 'administrator');


CREATE TABLE user(
  user_id serial PRIMARY KEY,
  privilege_type privilege_enum NOT NULL,
  user_name varchar(30) NOT NULL,
  user_email varchar(30) NOT NULL,
  password_hash varchar(30) NOT NULL
);

CREATE TABLE building(
  building_id serial PRIMARY KEY,
  building_name varchar(30) NOT NULL
);

CREATE TABLE study_space(
  space_id serial PRIMARY KEY,
  building_id int REFERENCES building(building_ID) NOT NULL,
  enclosed boolean NOT NULL,
  num_chairs int NOT NULL,
  space_loc varchar(300),
  picture_link varchar(300)
);

CREATE TABLE reservation(
  res_id serial PRIMARY KEY,
  student_id int REFERENCES users(user_ID) NOT NULL,
  space_id int REFERENCES study_space(space_ID) NOT NULL,
  res_start TIMESTAMP NOT NULL,
  res_end TIMESTAMP NOT NULL
);
