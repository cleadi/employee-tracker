SELECT 
	employees.id,
	(SELECT  CONCAT(employee.first_name, '  ', employee.last_name)) AS 'Employee Name', 
	emp_role.title, 
	department.name, 
	emp_role.salary 
FROM ((employee
INNER JOIN emp_role ON employee.emp_role_id = emp_role.id)
INNER JOIN department ON emp_role.department_id = department.id);