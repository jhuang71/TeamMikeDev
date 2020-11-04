CREATE SCHEMA public; -- you may or may not need this depending on whether you dropped your entire schema

CREATE TYPE privilege_enum AS enum ('student', 'administrator');

CREATE TABLE users(
  user_id varchar(30) PRIMARY KEY, -- google id stored as string because it is rather large
  privilege_type privilege_enum NOT NULL,
  user_name varchar(30) NOT NULL,
  user_email varchar(30) NOT NULL
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
  student_id varchar(30) REFERENCES users(user_ID) NOT NULL,
  space_id int REFERENCES study_space(space_ID) NOT NULL,
  res_start TIMESTAMP NOT NULL,
  res_end TIMESTAMP NOT NULL
);


-- DATA SEED
INSERT INTO building values (1, 'Hermann Hall');

INSERT INTO study_space values (1, 1, false, 4, 'South lobby', '/img/space1.jpg');
INSERT INTO study_space values (2, 1, false, 4, 'South lobby', '/img/space1.jpg');
INSERT INTO study_space values (3, 1, false, 4, 'South lobby', '/img/space1.jpg');
INSERT INTO study_space values (4, 1, false, 4, 'South lobby', '/img/space1.jpg');
INSERT INTO study_space values (5, 1, false, 4, 'South lobby', '/img/space1.jpg');
INSERT INTO study_space values (6, 1, false, 4, 'South lobby', '/img/space1.jpg');
INSERT INTO study_space values (7, 1, false, 4, 'South lobby', '/img/space1.jpg');
INSERT INTO study_space values (8, 1, false, 4, 'South lobby', '/img/space1.jpg');
INSERT INTO study_space values (9, 1, false, 4, 'South lobby', '/img/space1.jpg');
INSERT INTO study_space values (10, 1, false, 4, 'South lobby', '/img/space1.jpg');

INSERT INTO users values ('1', 'student', 'Test User', 'test.user@example.com');

--space 1 reserved every tuesday from 7:00 to 9:00 pm
INSERT INTO reservation (student_id, space_id, res_start, res_end) values ('1', 1, to_timestamp(1604451600), to_timestamp(1604458800));
INSERT INTO reservation (student_id, space_id, res_start, res_end) values ('1', 1, to_timestamp(1605056400), to_timestamp(1605063600));
INSERT INTO reservation (student_id, space_id, res_start, res_end) values ('1', 1, to_timestamp(1605661200), to_timestamp(1605668400));
INSERT INTO reservation (student_id, space_id, res_start, res_end) values ('1', 1, to_timestamp(1606266000), to_timestamp(1606273200));
INSERT INTO reservation (student_id, space_id, res_start, res_end) values ('1', 1, to_timestamp(1606870800), to_timestamp(1606878000));
INSERT INTO reservation (student_id, space_id, res_start, res_end) values ('1', 1, to_timestamp(1607475600), to_timestamp(1607482800));

--space 3 reserved every tuesday from 9:00 to 11:00 pm
INSERT INTO reservation (student_id, space_id, res_start, res_end) values ('1', 3, to_timestamp(1604458800), to_timestamp(1604462400));
INSERT INTO reservation (student_id, space_id, res_start, res_end) values ('1', 3, to_timestamp(1605063600), to_timestamp(1605067200));
INSERT INTO reservation (student_id, space_id, res_start, res_end) values ('1', 3, to_timestamp(1605668400), to_timestamp(1605672000));
INSERT INTO reservation (student_id, space_id, res_start, res_end) values ('1', 3, to_timestamp(1606273200), to_timestamp(1606276800));
INSERT INTO reservation (student_id, space_id, res_start, res_end) values ('1', 3, to_timestamp(1606878000), to_timestamp(1606881600));
INSERT INTO reservation (student_id, space_id, res_start, res_end) values ('1', 3, to_timestamp(1607482800), to_timestamp(1607486400));