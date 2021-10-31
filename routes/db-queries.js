// SQL dependecy and varible added so that for the db queries to function
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "rootuser",
    database: "employee_tracker",
  },
  console.log("Database connected!!")
);

// Functions that query the SQL db
fetchEmpRoleTable = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT emp_role.id, role_title, dept_name AS Department, role_salary FROM emp_role JOIN department ON emp_role.role_dept_id = department.id`,
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

fetchEmpRoles = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT role_title AS name, id AS value FROM emp_role`,
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

fetchEmpDepts = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT name, id AS value FROM department`, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

fetchDeptTable = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM department`, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

fetchEmployee = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT CONCAT(employee.emp_first_name, ' ', employee.emp_last_name) AS name, id AS value FROM employee`,
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

fetchEmployeeTable = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT 
        employee.id,
        CONCAT(employee.emp_first_name, '  ', employee.emp_last_name) AS 'Employee Name', 
        emp_role.role_title, 
        department.dept_name, 
        emp_role.role_salary,
        CONCAT(m.emp_first_name, '  ', m.emp_last_Name) AS 'Manager'
      FROM employee
      LEFT JOIN employee m ON m.id = employee.emp_manager_id
      LEFT JOIN emp_role ON employee.emp_role_id = emp_role.id
      LEFT JOIN department ON emp_role.role_dept_id = department.id`,
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

fetchEmpManager = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT 
    CONCAT(employee.emp_first_name, '  ', employee.emp_last_name) AS name,
    id AS value
    FROM employee 
    WHERE emp_manager_id IS NULL`,
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

// Functions that add new employees, roles, or departments into SQL db
addDepartment = (dept_name) => {
  db.query(
    `INSERT INTO department (dept_name) VALUES (?)`,
    dept_name,
    (err, results) => {
      if (err) console.log(err);
      return results;
    }
  );
};

addRole = (role_title, role_salary, role_dept_id) => {
  db.query(
    `INSERT INTO emp_role (role_title, role_salary, role_dept_id) VALUES (?, ?, ?)`,
    [role_title, role_salary, role_dept_id],
    (err, results) => {
      if (err) console.log(err);
      return results;
    }
  );
};

addEmployee = (emp_first_name, emp_last_Name, emp_role_id, emp_manager_id) => {
  db.query(
    `INSERT INTO employee (emp_first_name, emp_last_name, emp_role_id, emp_manager_id) VALUES (?, ?, ?, ?)`,
    [emp_first_name, emp_last_Name, emp_role_id, emp_manager_id],
    (err, results) => {
      if (err) console.log(err);
      return results;
    }
  );
};

updateEmployeeRole = (emp_role_id, id) => {
  db.query(
    `UPDATE employee SET emp_role_id = ? WHERE id = ?`,
    [emp_role_id, id],
    (err, results) => {
      if (err) console.log(err);
      return results;
    }
  );
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
  updateEmployeeRole,
};
