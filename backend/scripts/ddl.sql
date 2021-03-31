-- Create 'capstone_user' role
CREATE ROLE capstone_user WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	NOINHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'xxxxxx';

-- Create 'Capstone' database
CREATE DATABASE "Capstone"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
COMMENT ON DATABASE "Capstone"
    IS 'Capstone Database';
GRANT TEMPORARY, CONNECT ON DATABASE "Capstone" TO capstone_user WITH GRANT OPTION;

-- Create 'User' table
CREATE TABLE public."User"
(
    user_id integer NOT NULL,
    username character(15) NOT NULL,
    email character(50) NOT NULL,
    first_name character(50) NOT NULL,
    last_name character(50) NOT NULL,
    phone character(10),
    status integer NOT NULL,
    score bigint,
    CONSTRAINT user_id PRIMARY KEY (user_id)
        INCLUDE(user_id),
    CONSTRAINT "Unique Email" UNIQUE (email),
    CONSTRAINT "Unique Username" UNIQUE (username),
    CONSTRAINT "Score above 0" CHECK (score >= 0) NOT VALID
)
TABLESPACE pg_default;
ALTER TABLE public."User"
    OWNER to capstone_user;

-- Create 'Event' Table
CREATE TABLE public."Event"
(
    event_id integer NOT NULL,
    event_title character(50) NOT NULL,
    summary character(250),
    organizers character(50)[],
    num_registered integer NOT NULL,
    capacity integer,
    location character(250) NOT NULL,
    date date NOT NULL,
    CONSTRAINT event_id PRIMARY KEY (event_id),
    CONSTRAINT "Unique Title" UNIQUE (event_title),
    CONSTRAINT "Num Registered GT 0" CHECK (num_registered >= 0) NOT VALID,
    CONSTRAINT "Capacity GT 0" CHECK (capacity >=0) NOT VALID,
    CONSTRAINT "Capacity GT Num Registered" CHECK (capacity >= num_registered) NOT VALID
)
TABLESPACE pg_default;
ALTER TABLE public."Event"
    OWNER to capstone_user;

-- Create 'Goal' Table
CREATE TABLE public."Goal"
(
    goal_id integer NOT NULL,
    user_id integer NOT NULL,
    summary text NOT NULL,
    to_be_completed date,
    CONSTRAINT goal_id PRIMARY KEY (goal_id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public."User" (user_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
TABLESPACE pg_default;
ALTER TABLE public."Goal"
    OWNER to capstone_user;

-- Create 'Achievement' Table
CREATE TABLE public."Achievement"
(
    achievement_id integer NOT NULL,
    user_id integer NOT NULL,
    title character(50) NOT NULL,
    summary character(250) NOT NULL,
    completed_date date NOT NULL,
    other_comments text,
    attachment_url text[],
    CONSTRAINT achievement_id PRIMARY KEY (achievement_id),
    CONSTRAINT title UNIQUE (title),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public."User" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE public."Achievement"
    OWNER to capstone_user;

-- Create 'Certification' Table
CREATE TABLE public."Certification"
(
    certification_id integer NOT NULL,
    user_id integer NOT NULL,
    name character(50) NOT NULL,
    description character(250),
    attachment_url text,
    CONSTRAINT certification_id PRIMARY KEY (certification_id),
    CONSTRAINT name UNIQUE (name),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public."User" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE public."Certification"
    OWNER to capstone_user;

-- Create 'Training' Table
CREATE TABLE public."Training"
(
    training_id integer NOT NULL,
    title character(100) NOT NULL,
    url text NOT NULL,
    keywords character(50)[] NOT NULL,
    category character(50),
    views integer,
    rating double precision,
    num_ratings integer,
    CONSTRAINT training_id PRIMARY KEY (training_id),
    CONSTRAINT "Title" UNIQUE (title),
    CONSTRAINT "Views GT 0" CHECK (views >= 0) NOT VALID,
    CONSTRAINT "Rating GT 0" CHECK (rating >= 0) NOT VALID,
    CONSTRAINT "Rating LT 5" CHECK (rating <= 5) NOT VALID,
    CONSTRAINT "NumRatings GT 0" CHECK (num_ratings >= 0) NOT VALID
)
TABLESPACE pg_default;
ALTER TABLE public."Training"
    OWNER to capstone_user;

-- Create 'UserEvent' Table
CREATE TABLE public."UserEvent"
(
    user_event_id integer NOT NULL,
    event_id integer NOT NULL,
    user_id integer NOT NULL,
    status integer NOT NULL,
    CONSTRAINT user_event_id PRIMARY KEY (user_event_id),
    CONSTRAINT "User-Event" UNIQUE (event_id, user_id),
    CONSTRAINT event_id FOREIGN KEY (event_id)
        REFERENCES public."Event" (event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public."User" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT "Status GT 0" CHECK (status >= 0) NOT VALID,
    CONSTRAINT "Status LT 3" CHECK (status <= 3) NOT VALID
)
TABLESPACE pg_default;
ALTER TABLE public."UserEvent"
    OWNER to capstone_user;

-- Create 'UserTraining' Table
CREATE TABLE public."UserTraining"
(
    user_training_id integer NOT NULL,
    training_id integer NOT NULL,
    user_id integer NOT NULL,
    status integer NOT NULL,
    CONSTRAINT user_training_id PRIMARY KEY (user_training_id),
    CONSTRAINT "User-Training" UNIQUE (training_id, user_id),
    CONSTRAINT training_id FOREIGN KEY (training_id)
        REFERENCES public."Training" (training_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public."User" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT "Status GT 0" CHECK (status >= 0) NOT VALID,
    CONSTRAINT "Status LT 3" CHECK (status <= 3) NOT VALID
)
TABLESPACE pg_default;
ALTER TABLE public."UserTraining"
    OWNER to capstone_user;