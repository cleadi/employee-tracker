// SQL dependecy and varible added so that for the db queries to function
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'rootuser',
    database: 'movies_db'
  },
  console.log('Database connected!!')
);

// Functions that query the SQL db
fetchEmpRoleTable = () => {
  return new Promise ((resolve, reject) => {
    db.query('SELECT emp_role.id, title, name AS Department, salary FROM emp_role JOIN departments ON roles.department_id = department.id', (err, results) => {
      if (err)
        reject(err)
      resolve(results)
    })
  })
};

fetchEmpRoles = () => {
  return new Promise ((resolve, reject) => {
    db.query(`SELECT title AS name, id AS value from emp_role`, (err, results) => {
      if (err)
        reject(err)
      resolve(results)
    })
  })
};

fetchEmpDepts = () => {
  return new Promise ((resolve, reject) => {
    db.query(`SELECT name, id AS value FROM department`, (err, results) => {
      if (err)
        reject(err)
      resolve(results)
    })
  })
};

fetchDeptTable = () => {
  return new Promise ((resolve, reject) => {
    db.query('SELECT * FROM department', (err, results) => {
      if (err)
        reject(err)
      resolve(results)
    })
  })
};

fetchEmployee = () => {
  return new Promise ((resolve, reject) => {
    db.query(`SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS name, id AS value FROM employee`, (err, results) => {
      if (err)
        reject(err)
      resolve(results)
    })
  })
};

fetchEmployeeTable = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT 
        employee.id,
        CONCAT(employee.first_name, '  ', employee.last_name) AS 'Employee Name', 
        emp_role.title, 
        department.name, 
        emp_role.salary,
        CONCAT(m.first_name, '  ', m.last_Name) AS 'Manager'
      FROM employee
      LEFT JOIN employee m ON m.id = employee.emp_manager_id
      LEFT JOIN emp_role ON employee.role_id = emp_role.id
      LEFT JOIN department ON emp_role.department_id = department.id`, (err, results) => {
      if (err)
        reject(err)
      resolve(results)
    })
  })
};

fetchEmpManager = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT 
    CONCAT(employee.first_name, '  ', employee.last_name) AS name,
    id AS value
    FROM employee 
    WHERE emp_manager_id IS NULL`, (err, results) => {
      if (err)
        reject(err)
      resolve(results)
    })
  })
};

// Functions that add new employees, roles, or departments into SQL db
addDepartment = (name) => {
  db.query('INSERT INTO department (name) VALUES (?)', name, (err, results) => {
    if (err)
      console.log(err)
    return results
  })
};

addRole = (title, salary, department_id) => {
  db.query('INSERT INTO emp_role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id], (err, results) => {
    if (err)
      console.log(err)
    return results
  })
};

addEmployee = (first, last, role, manager) => {
  db.query('INSERT INTO employee (first_name, last_name, emp_role_id, emp_manager_id) VALUES (?, ?, ?, ?)', [first, last, role, manager], (err, results) => {
    if (err)
      console.log(err)
    return results
  })
};

updateEmployee = (id, role) => {
  db.query('UPDATE employee SET emp_role_id = ? WHERE id = ?', [role, id], (err, results) => {
    if(err)
      console.log(err)
    return results
  })
};

// Exporting functions for use in server.js file
module.exports = {
  fetchEmpRoleTable,
  fetchEmpRoles,
  fetchEmpDepts,
  fetchDeptTable,
  fetchEmployee,
  fetchEmployeeTable,
  fetchEmpManager,
  addRole,
  addEmployee,
  updateEmployee
};
