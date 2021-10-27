INSERT INTO department (dept_name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO emp_role (role_title, role_salary, role_dept_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Accountant", 100000, 3),
        ("Lawyer", 190000, 4),
        ("Legal Team Lead", 250000, 4),
        ("Lead Engineer", 150000, 2);

INSERT INTO employee (emp_first_name, emp_last_name, emp_role_id, emp_manager_id)
VALUES  ("Mike", "Doe", 1, 100),
        ("Ashley", "Singh", 1, 99),
        ("Dave", "Lee", 2, 98),
        ("Terrance", "Mann", 3, 97),
        ("Luke", "Shaw", 3, 96);
        ("Dave", "Peters", 4, 96);
        ("Jimmy", "John", 4, 96);
        ("Frank", "Zappa", 2, 96);
        