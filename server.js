const inquirer = require('inquirer');
const {
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
} = require('./routes/db-queries');

const PORT = process.env.PORT || 3001;

const questions = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'userSelected',
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
];

viewAllEmployees = () => {
  fetchEmpRoleTable().then(
    response => {
      console.table(response);
      init()
    }
  )
};

addEmployees = () => {
  fetchEmpManager().then(res => {
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'What is the first name of the employee?',
          name: 'first'
        },
        {
          type: 'input',
          message: 'What is the last name of the employee?',
          name: 'last'
        },
        {
          type: 'list',
          message: 'Select their manager:',
          name: 'manager',
          choices: [...res, { name: 'none', value: null }]
        }
      ])
      .then(res => {
        askEmpRoleQuestion(res)
      })
  })
};

askEmpRoleQuestion = (data) => {
  fetchEmpRoles().then(res => {
    inquirer
      .prompt([
        {
          type: 'list',
          message: 'What is the role of the employee?',
          name: 'role',
          choices: [...res]
        }
      ]).then(res => {
        if (Object.keys(data).length == 3) {
          addEmployee(data.first, data.last, res.role, data.manager);
          console.log('Added new employee!!')
        } else {
          updateEmployeeRole(data.emp, res.role)
          console.log('Updated employee role!')
        }
        init()
      })
  })
};

viewAllRoles = () => {
  fetchEmpRoleTable().then(
    (res) => {
      console.table(res);
      init()
    }
  )
};

addRoles = () => {
  fetchEmpDepts().then(res => {
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'What is the title of the role?',
          name: 'title'
        },
        {
          type: 'input',
          message: 'What is the salary of the role?',
          name: 'salary'
        },
        {
          type: 'list',
          message: 'Which department does the role belong to?',
          name: 'department',
          choices: [...res]
        }
      ])
      .then(res => {
        addRoles(res.title, res.salary, res.department);
        console.log('Added new role!')
        init()
      })
  })
};

viewAllDepartments = () => {
  fetchDeptTable().then(
    res => {
      console.table(res);
      init()
    }
  )
};

addDept = () => {
  inquirer
    .prompt([
      {
        type:'input',
        message: 'What is the name of the new department?',
        name: 'department'
      }
    ])
    .then(res => {
      addDept(res.department);
      console.log('Added new department!')
      init();
    })
};

quit = () => {
  return
};

function init() {
  inquirer
    .prompt(questions)
    .then(answers => { // res??
      switch (answers.userSelected) { // res??
        case 'View All Employees':
          viewAllEmployees()
          break
        case 'Add Employees':
          addEmployee()
          break
        case 'Update Employee Role':
          updateEmployeeRole()
          break
        case 'View All Roles':
          viewAllRoles()
          break
        case 'Add Role':
          addRole()
          break
        case 'View All Departments':
          viewAllDepartments()
          break
        case 'Add Department':
          addDept()
          break
        case 'Quit application':
          quit()
          break
        default:
          console.log('Error')
      }
    })
};

init();
