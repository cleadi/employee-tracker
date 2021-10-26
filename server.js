const cTable = require('console.table')
const express = require('express')
const mysql = require('mysql2')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'rootuser',
    database: 'movies_db'
  },
  console.log('Database connected!!')
)

function addEmployee() {
  //...
}

function addRole() {
  //...
}

function viewEmployees() {
  //... run the db query, get results, display results with console.table
  `SELECT * FROM employee
    LEFT JOIN roles ON emp_role_id = ...
    LEFT JOIN departments ON...`
}

function init() {
  prompt([
    //... inital questions
  ])
}

app.listen(PORT, () => {
  console.log('App listening at http://localhost:3001')
})
