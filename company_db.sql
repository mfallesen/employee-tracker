DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id)
);


INSERT INTO department (name)
VALUES ("Human Resources");
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Grace", "Pritchard", 0, 0);
INSERT INTO role (title, salary, department_id)
VALUES ("Human Resources Representative", 70000, department_id);