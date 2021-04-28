-- Create 'capstone_user' role
DROP ROLE IF EXISTS capstone_user;
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
DROP DATABASE IF EXISTS "Capstone";
CREATE DATABASE "Capstone"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
COMMENT ON DATABASE "Capstone"
    IS 'Capstone Database';
GRANT TEMPORARY, CONNECT ON DATABASE "Capstone" TO capstone_user WITH GRANT OPTION;

-- Create 'UserStatus' type
DROP TYPE IF EXISTS UserStatus CASCADE;
CREATE TYPE UserStatus AS ENUM ('active', 'inactive');

-- Create 'User' table
DROP TABLE IF EXISTS public."User" CASCADE;
CREATE TABLE public."User"
(
    user_id SERIAL NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text DEFAULT ''
    status UserStatus NOT NULL,
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

-- Create 'EventStatus' type
DROP TYPE IF EXISTS EventStatus CASCADE;
CREATE TYPE EventStatus AS ENUM ('open', 'closed', 'pending');

-- Create 'Event' Table
DROP TABLE IF EXISTS public."Event" CASCADE;
CREATE TABLE public."Event"
(
    event_id SERIAL NOT NULL,
    event_title text NOT NULL,
    summary text,
    organizers text[],
    num_registered integer NOT NULL,
    capacity integer DEFAULT 0,
    location text NOT NULL,
    date date NOT NULL,
    status EventStatus NOT NULL,
    CONSTRAINT event_id PRIMARY KEY (event_id),
    CONSTRAINT "Unique Title" UNIQUE (event_title),
    CONSTRAINT "Num Registered GT 0" CHECK (num_registered >= 0) NOT VALID,
    CONSTRAINT "Capacity GT 0" CHECK (capacity >=0) NOT VALID,
    CONSTRAINT "Capacity GT Num Registered" CHECK (capacity >= num_registered) NOT VALID
)
TABLESPACE pg_default;
ALTER TABLE public."Event"
    OWNER to capstone_user;

-- Create 'GoalStatus' type
DROP TYPE IF EXISTS GoalStatus CASCADE;
CREATE TYPE GoalStatus AS ENUM ('submitted', 'pending', 'completed');

-- Create 'Goal' Table
DROP TABLE IF EXISTS public."Goal" CASCADE;
CREATE TABLE public."Goal"
(
    goal_id SERIAL NOT NULL,
    user_id integer NOT NULL,
    summary text NOT NULL,
    to_be_completed_date date,
    completed_date date,
    status 
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
DROP TABLE IF EXISTS public."Achievement" CASCADE;
CREATE TABLE public."Achievement"
(
    achievement_id SERIAL NOT NULL,
    user_id integer NOT NULL,
    title text NOT NULL,
    summary text NOT NULL,
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
DROP TABLE IF EXISTS public."Certification" CASCADE;
CREATE TABLE public."Certification"
(
    certification_id SERIAL NOT NULL,
    user_id integer NOT NULL,
    name text NOT NULL,
    description text,
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
DROP TABLE IF EXISTS public."Training" CASCADE;
CREATE TABLE public."Training"
(
    training_id SERIAL NOT NULL,
    title text NOT NULL,
    url text NOT NULL,
    keywords text[] NOT NULL,
    category text,
    views integer,
    rating double precision,
    num_ratings integer,
    total_ratings_score integer,
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

-- Create 'UserEventStatus' type
DROP TYPE IF EXISTS UserEventStatus CASCADE;
CREATE TYPE UserEventStatus AS ENUM ('registered', 'interested', 'attended');

-- Create 'UserEvent' Table
DROP TABLE IF EXISTS public."UserEvent" CASCADE;
CREATE TABLE public."UserEvent"
(
    user_event_id SERIAL NOT NULL,
    event_id integer NOT NULL,
    user_id integer NOT NULL,
    status UserEventStatus NOT NULL,
    CONSTRAINT user_event_id PRIMARY KEY (user_event_id),
    CONSTRAINT "User-Event" UNIQUE (event_id, user_id),
    CONSTRAINT event_id FOREIGN KEY (event_id)
        REFERENCES public."Event" (event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public."User" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
TABLESPACE pg_default;
ALTER TABLE public."UserEvent"
    OWNER to capstone_user;

-- Create 'UserEventStatus' type
DROP TYPE IF EXISTS UserTrainingStatus CASCADE;
CREATE TYPE UserTrainingStatus AS ENUM ('pending', 'interested', 'watched');

-- Create 'UserTraining' Table
DROP TABLE IF EXISTS public."UserTraining" CASCADE;
CREATE TABLE public."UserTraining"
(
    user_training_id SERIAL NOT NULL,
    training_id integer NOT NULL,
    user_id integer NOT NULL,
    status UserTrainingStatus NOT NULL,
    CONSTRAINT user_training_id PRIMARY KEY (user_training_id),
    CONSTRAINT "User-Training" UNIQUE (training_id, user_id),
    CONSTRAINT training_id FOREIGN KEY (training_id)
        REFERENCES public."Training" (training_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public."User" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
TABLESPACE pg_default;
ALTER TABLE public."UserTraining"
    OWNER to capstone_user;