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
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        inquirer.prompt([

            {
                type: "list",
                message: "Welcome. What would you like to do today?",
                name: "startprompt",
                choices: ["Add Department, Role, or Employee.", "View Company Roster.", "Update Employee Information."]
            },


        ]).then(function (data) {
            console.log(data);
            switch (data.startprompt) {
                case 'Add Department, Role, or Employee.':
                    console.log("Chosen!");
                    addToCompany();
                    break;
                case 'View Company Information.':
                    viewCompany();
                    break;
                case 'Update Employee Information.':
                    updateCompanyInfo();
                    break;
                default:
                    console.log("OOPS!. Something went wrong");
                    break;
            }

        });
        connection.end();
    });
}




// Inquirer prompts

function addToCompany() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to add?",
            name: "addstartprompt",
            choices: ["Add Department", "Add Employee", "Add Company Role"]
        },
    ]).then(function (response) {

        switch (response.startprompt) {
            case 'Add Department':
                console.log("Adding Department");
                addDepartment();
                break;
            case 'Add Employee':
                console.log("Adding Department");
                addEmployee();
                break;
            case 'Add Company Role':
                console.log("Adding Department");
                addRole();
                break;
            default:
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
        console.log(response);
        // connection.query("INSERT INTO department SET ?"), {
        //     name: response.name
        // }, function (err) {
        //     if (err) throw err
        //     console.log("Department Added!");
        // }
    })
    
}
function addEmployee() {
    inquirer.prompt([

    ]).then(function (response) {
        
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
    ]).then(function (response) {
        connection.query("INSERT INTO department SET ?"), {
            name: response.name
        }, function (err) {
            if (err) throw err
            console.log("Department Added!");
        }
    })
}



        
        // {
        //     type: "input",
        //     message: "What would you like to name your new company role??",
        //     name: "addcompanyrole",
        //     when: function (response) {
        //         return response.addstartprompt === "Add Role";
        //     }
        // },
        // {
        //     type: "input",
        //     message: "What is the job title?",
        //     name: "addjobtitle",
        //     when: function (response) {
        //         return response.addstartprompt === "Add Role";
        //     }
        // },
        // {
        //     type: "input",
        //     message: "What is the job salary?",
        //     name: "addjobsalary",
        //     when: function (response) {
        //         return response.addstartprompt === "Add Role";
        //     }
        // },
        // {
        //     type: "input",
        //     message: "What is your New Employee's first name?",
        //     name: "addfirstname",
        //     when: function (response) {
        //         return response.addstartprompt === "Add Employee";
        //     }
        // },
        // {
        //     type: "input",
        //     message: "What is your New Employee's last name?",
        //     name: "addlastname",
        //     when: function (response) {
        //         return response.addstartprompt === "Add Employee";
        //     }
        // },
        // {
        //     type: "input",
        //     message: "What is your New Employee's role?",
        //     name: "addemployeerole",
        //     when: function (response) {
        //         return response.addstartprompt === "Add Employee";
        //     }
        // }


    

// View company info
function viewCompany() {
    console.log("Im viewing the company");
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to view?",
            name: "viewstartprompt",
            choices: ["View Departments", "View Employees", "View Company Roles"]
        },
        {
            type: "input",
            message: "Which department do you want to view?",
            name: "viewdepartment",
            when: function (response) {
                return response.viewstartprompt === "View Department";
            }
        },
        {
            type: "input",
            message: "Which company role would you like to view?",
            name: "viewcompanyrole",
            when: function (response) {
                return response.viewstartprompt === "View Company Roles";
            }
        },
        {
            type: "input",
            message: "Which employee do you wish to view?",
            name: "viewemployees",
            when: function (response) {
                return response.viewstartprompt === "View Employees";
            }
        },


    ]).then(function (responses) {

        connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee RIGHT JOIN role ON employee.role_id = role.id RIGHT JOIN department ON role.department_id = department.id;", {

        }, function (err) {
            if (err) throw err
            console.table(responses);
        })
    })
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