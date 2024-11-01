-- -- Connect to the newly created database
\c "react-course-admin";


-- -- Cretae authors table
CREATE TABLE authors (
	id serial4 NOT NULL,
	name varchar NOT NULL,
	"avgCourseRating" NUMERIC(10, 2) NOT NULL,
	CONSTRAINT "PK_author_id" PRIMARY KEY (id)
);

-- -- Create the courses table
CREATE TABLE courses (
	id serial4 NOT NULL,
	title varchar NOT NULL,
	category varchar NOT NULL,
	"authorId" int4 NOT NULL,
	CONSTRAINT "PK_course_id" PRIMARY KEY (id)
);

-- add author foreign key to courses
ALTER TABLE courses ADD CONSTRAINT "FK_course_author_id" FOREIGN KEY ("authorId") REFERENCES authors(id) ON DELETE CASCADE;


--- Seed initial data
INSERT INTO authors (name, "avgCourseRating") VALUES
('Corey House', 4.7),
('Samer Buna', 4.5),
('Jonathan Mills', 4.5);

INSERT INTO courses (title, category, "authorId") VALUES
('Securing React Apps with Auth0', 'JavaScript', 1),
('React: The Big Picture', 'JavaScript', 2),
('Creating Reusable React Components', 'JavaScript', 1),
('Building a JavaScript Development Environment', 'JavaScript', 1),
('Building Applications with React and Redux"', 'JavaScript', 1),
('Building Applications in React and Flux', 'JavaScript', 1),
('Clean Code: Writing Code for Humans', 'Software Practices', 1),
('Architecting Applications for the Real World', 'Software Architecture', 1),
('Becoming an Outlier: Reprogramming the Developer Mind', 'Career', 1),
('Web Component Fundamentals', 'HTML5', 1),
('React: Getting Started', 'JavaScript', 2),
('Advanced React.js', 'JavaScript', 2),
('Advanced Node.js', 'JavaScript', 2),
('Building Scalable APIs with GraphQL', 'Rest API', 2),
('RESTful Web Services with Node.js and Express', 'Rest API', 3),
('Testing JavaScript for Node.js with Mocha', 'category', 3),
('JavaScript Best Practices"', 'JavaScript', 3),
('Practical Design Patterns in JavaScript', 'JavaScript', 3);

