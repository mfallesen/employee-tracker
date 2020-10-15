// Imports
const ask = require('./prompts.js')
// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql")
require("console.table")

// Database Connection
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "company_db"
});
function start() {
    console.log("connected as id " + connection.threadId);
    inquirer.prompt([

        {
            type: "list",
            message: "Welcome. What would you like to do today?",
            name: "startprompt",
            choices: ["Add Department, Role, or Employee.", "View Company Information.", "Update Employee Information.", "QUIT"]
        },


    ]).then(function (data) {
        console.log(data);
        switch (data.startprompt) {
            case 'Add Department, Role, or Employee.':
                addToCompany();
                break;
            case 'View Company Information.':
                viewCompany();
                break;
            case 'Update Employee Information.':
                updateCompanyInfo();
                break;
            case 'QUIT':
                connection.end()
                break;
            default:
                console.log("-------------------");
                console.log("OOPS!. Something went wrong");
                break;
        }
    });
}




// Inquirer prompts

function addToCompany() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to add?",
            name: "addstartprompt",
            choices: ["Add Department", "Add Employee", "Add Company Role", "Main Menu"]
        },
    ]).then(function (response) {
        switch (response.addstartprompt) {
            case 'Add Department':
                console.log("Adding Department");
                addDepartment();
                break;
            case 'Add Employee':
                console.log("Adding Employee");
                addEmployee();
                break;
            case 'Add Company Role':
                console.log("Adding Role");
                addRole();
                break;
            case 'Main Menu':
                start();
                break;
            default:
                console.log("=============");
                console.log("OOPS!. Something went wrong");
                break;
        }

    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What would you like to name your new company department?",
            name: "adddepartment",
        },
    ]).then(function (response) {

        connection.query(`INSERT INTO department (name) VALUES ("${response.adddepartment}")`), function (err) {
            if (err) throw err
            console.log("Something went wrong adding your department");
        }
        console.log(response.adddepartment + " Department Added!");
        
        start();
    })

}
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your New Employee's first name?",
            name: "addfirstname",
        },
        {
            type: "input",
            message: "What is your New Employee's last name?",
            name: "addlastname",
        },
        {
            type: "input",
            message: "What is your New Employee's role?",
            name: "addemployeerole",
        },
        {
            type: "input",
            message: "Who is your New Employee's Manager?",
            name: "addemployeemanager",
        },

    ]).then(function (response) {
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.addfirstname}','${response.addlastname}','${response.addemployeerole}','${response.addemployeemanager}')`), function (err) {
            if (err) throw err
        }
        console.log(response);
        console.log("Employee Added!");
        
        start();
    })
}
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the job title?",
            name: "addjobtitle",
        },
        {
            type: "input",
            message: "What is the job salary?",
            name: "addjobsalary",
        },
        {
            type: "input",
            message: "What department does this role fall under?",
            name: "addjobdepartment",
        },
    ]).then(function (response) {
        connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${response.addjobtitle}','${response.addjobsalary}','${response.addjobdepartment}')`), function (err) {
            if (err) throw err
        }
        console.log("Role Added!");
       
        start();
    })
}

// View company info
function viewCompany() {
    console.log("Im viewing the company");
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to view?",
            name: "viewstartprompt",
            choices: ["View Departments", "View Employees", "View Company Roles", "Main Menu", "QUIT"]
        },
        // {
        //     type: "input",
        //     message: "Which department do you want to view?",
        //     name: "viewdepartment",
        //     when: function (response) {
        //         return response.viewstartprompt === "View Department";
        //     }
        // },
        // {
        //     type: "input",
        //     message: "Which company role would you like to view?",
        //     name: "viewcompanyrole",
        //     when: function (response) {
        //         return response.viewstartprompt === "View Company Roles";
        //     }
        // },
        // {
        //     type: "input",
        //     message: "Which employee do you wish to view?",
        //     name: "viewemployees",
        //     when: function (response) {
        //         return response.viewstartprompt === "View Employees";
        //     }
        // },


    ]).then(function (response) {

        switch (response.viewstartprompt) {
            case 'View Departments':
                console.log("==================");
                console.log("Viewing Department");
                console.log("==================");
                viewDepartments();
                break;
            case 'View Employees':
                console.log("=================");
                console.log("Viewing Employees");
                console.log("=================");
                viewEmployees();
                break;
            case 'View Company Roles':
                console.log("============");
                console.log("Viewing Role");
                console.log("============");
                viewRoles();
                break;
            case 'Main Menu':
                start();
                break;
            case 'QUIT':
                break;
            default:
                console.log("=============");
                console.log("OOPS!. Something went wrong");
                break;
        }


        // connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee RIGHT JOIN role ON employee.role_id = role.id RIGHT JOIN department ON role.department_id = department.id;", {

        // }, function (err) {
        //     if (err) throw err
        //     console.table(responses);
        // })
    })
}

function viewEmployees() {

    let query = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee RIGHT JOIN role ON employee.role_id = role.id RIGHT JOIN department ON role.department_id = department.id;";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    
    start();
  });   
}

function viewDepartments() {
    let query = "SELECT * FROM company_db.department;";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    
    start();
  });  
}

function viewRoles() {
    let query = "SELECT * FROM company_db.role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    
    start();
  });  
}

// Update Company Information
function updateCompanyInfo() {
    console.log("Im updating the company");
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to update?",
            name: "updatestartprompt",
            choices: ["Update Departments", "Update Employees", "Update Company Roles"]
        },
        {
            type: "input",
            message: "Which department do you want to update?",
            name: "updatedepartment",
            when: function (response) {
                return response.viewstartprompt === "Update Departments";
            }
        },
        {
            type: "input",
            message: "Which company role would you like to update?",
            name: "updatecompanyrole",
            when: function (response) {
                return response.viewstartprompt === "Update Company Roles";
            }
        },
        {
            type: "input",
            message: "Which employee do you wish to update?",
            name: "updateemployees",
            when: function (response) {
                return response.viewstartprompt === "Update Employees";
            }
        },


    ]).then(function (responses) {
        return responses
    })
}


// Initialize Program
start();