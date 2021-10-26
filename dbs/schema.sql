CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30)
);

CREATE TABLE emp_role(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_title VARCHAR(30),
  role_salary DECIMAL,
  role_dept_id INT
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  emp_first_name VARCHAR(30),
  emp_last_name VARCHAR(30),
  emp_role_id INT,
  emp_manager_id INT
);

--Do I need to add a foreign key above somewhere??
