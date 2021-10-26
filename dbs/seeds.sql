INSERT INTO department (dept_name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO emp_role (role_title, role_salary, role_dept_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 2),
        ("Software Engineer", 120000, 3),
        ("Account Manager", 160000, 4),
        ("Lawyer", 190000, 5),
        ("Legal Team Lead", 250000, 6),
        ("Lead Engineer", 150000, 7);

INSERT INTO employee (emp_first_name, emp_last_name, emp_role_id, emp_manager_id)
VALUES  ("Mike", "Doe", 1, 100),
        ("Ashley", "Singh", 2, 99),
        ("Dave", "Lee", 3, 98),
        ("Terrance", "Mann", 4, 97),
        ("Luke", "Shaw", 5, 96);
        