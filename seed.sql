DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(8,2),
department_id INT ,
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT ,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Human Resources");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Management");
INSERT INTO department (name)
VALUES ("Production");

INSERT INTO role (title, salary, department_id)
VALUES ("Human Resources Representative", 70000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Administrative Assistant", 50000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Intern", 45000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Project Manager", 200000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Production Manager", 90000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Worker", 55000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Grace", "Pritchard", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kathy", "Miller", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jacob", "Swan", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sun", "Lee", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rajesh", "Signh", 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Erin", "Smith", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Aaron", "Jones", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Kinds", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Horowitz", 6, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jose", "Aguilar", 6, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rachel", "Worley", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Juan", "Dos Santos", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Cruz", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Luke", "Dame", 7, 1);