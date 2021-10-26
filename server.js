const cTable = require('console.table')
const express = require('express')
const inquirer = require('inquirer')
const mysql = require('mysql2')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const questions = [
  {
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'Add Department',
      'Quit'
    ]
  },
  ///...
]

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'rootuser',
    database: 'movies_db'
  },
  console.log('Database connected!!')
)

function addEmployee() {
  db.query(`GET ALL THE ROLES`, (err, results) => {
  //... results (array of roles)
  })
}

function addRole() {
  //...
}

function viewAllEmployees() {
  // run the db query, get results, display results with console.table
  `SELECT * FROM employee
    LEFT JOIN roles ON emp_role_id = ...
    LEFT JOIN departments ON...`
}
// STOPPED HERE ON TUESDAY EVENING --> add functions for each selection?
// --> run query code inside those functions?
function viewAllDepartments() {
  // run the db query, get results, display results with console.table
  `SELECT * FROM employee
    LEFT JOIN roles ON emp_role_id = ...
    LEFT JOIN departments ON...`
}

function init() {
  inquirer
    .prompt(questions)
    //...
}

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})

init()
