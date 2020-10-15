// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql")
require("console.table")

// Database Connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_db"
});
function start() {
    console.log("==============================================");
    console.log("=                                            =");
    console.log("=          ACME EMPLOYEE TRACKER             =");
    console.log("=                                            =");
    console.log("==============================================");
    inquirer.prompt([

        {
            type: "list",
            message: "Welcome! What would you like to do today?",
            name: "startprompt",
            choices: ["Add Department, Role, or Employee.", "View Company Information.", "Update Employee Information.", "QUIT"]
        },


    ]).then(function (data) {
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
                console.log("See You Soon!");
                connection.end()
                break;
            default:
                console.log("X------------X------------X");
                console.log("OOPS!. Something went wrong");
                console.log("X------------X------------X");
                break;
        }
    });
}

// Add to company
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
                console.log("=================");
                console.log("Adding Department");
                console.log("=================");
                addDepartment();
                break;
            case 'Add Employee':
                console.log("===============");
                console.log("Adding Employee");
                console.log("===============");
                addEmployee();
                break;
            case 'Add Company Role':
                console.log("===========");
                console.log("Adding Role");
                console.log("===========");
                addRole();
                break;
            case 'Main Menu':
                start();
                break;
            default:
                console.log("X------------X------------X");
                console.log("OOPS!. Something went wrong");
                console.log("X------------X------------X");
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
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to view?",
            name: "viewstartprompt",
            choices: ["View Departments", "View Employees", "View Company Roles", "Main Menu", "QUIT"]
        },
       
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
                console.log("X------------X------------X");
                console.log("OOPS!. Something went wrong");
                console.log("X------------X------------X");
                break;
        }
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
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to update?",
            name: "updatestartprompt",
            choices: ["Update Employee", "Main Menu", "Quit"]
        },
        {
            type: "input",
            message: "Which employee do you wish to update? Use Employee ID.",
            name: "updateemployee",
        },
        {
            type: "input",
            message: "What role do you wish to assign them? Use Numeric Role.",
            name: "updateemployeerole",
        },
    ]).then(function (responses) {
        console.log(responses);
        switch (responses.updatestartprompt) {
            case 'Update Employee':
                console.log("============");
                console.log("Updating Role");
                console.log("============");
                updateEmployee(responses);
                break;
            case 'Main Menu':
                start();
                break;
            case 'QUIT':
                break;
            default:
                console.log("X------------X------------X");
                console.log("OOPS!. Something went wrong");
                console.log("X------------X------------X");
                break;
        }  
    })
}

function updateEmployee(responses) {
    let query = `UPDATE employee SET role_id = ${responses.updateemployeerole} WHERE id = ${responses.updateemployee};`;
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log("Employee Updated");
    start();
  });  
}



// Initialize Program
start();