// Dependencies
const inquirer = require("inquirer");

function addToCompany() {
    console.log("Im here!");
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to add?",
            name: "addstartprompt",
            choices: ["Add Department", "Add Employee", "Add Company Role"]
        },
        {
            type: "input",
            message: "What would you like to name your new company department?",
            name: "adddepartment",
            when: function (response) {
                return response.addstartprompt === "Add Department";
            }
        },
        {
            type: "input",
            message: "What would you like to name your new company role??",
            name: "addcompanyrole",
            when: function (response) {
                return response.addstartprompt === "Add Role";
            }
        },
        {
            type: "input",
            message: "What is the job title?",
            name: "addjobtitle",
            when: function (response) {
                return response.addstartprompt === "Add Role";
            }
        },
        {
            type: "input",
            message: "What is the job salary?",
            name: "addjobsalary",
            when: function (response) {
                return response.addstartprompt === "Add Role";
            }
        },
        {
            type: "input",
            message: "What is your New Employee's first name?",
            name: "addfirstname",
            when: function (response) {
                return response.addstartprompt === "Add Employee";
            }
        },
        {
            type: "input",
            message: "What is your New Employee's last name?",
            name: "addlastname",
            when: function (response) {
                return response.addstartprompt === "Add Employee";
            }
        },
        {
            type: "input",
            message: "What is your New Employee's role?",
            name: "addemployeerole",
            when: function (response) {
                return response.addstartprompt === "Add Employee";
            }
        }


    ]).then( function(responses) {
        
        // console.table(responses); 
        return responses
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
        

    ]).then( function(responses) {
        console.table(responses);
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
        

    ]).then( function(responses) {
        console.table(responses);
    })
}


module.exports = {updateCompanyInfo, viewCompany, addToCompany};