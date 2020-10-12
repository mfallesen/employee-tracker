// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql")
const logTable = require("console.table")

// SQL queries go here

// Inquirer prompts
inquirer.prompt([

    {
        type: "list",
        message: "Welcome. What would you like to do today?",
        name: "startprompt",
        choices: ["Add Department, Role, or Employee.", "View Company Roster.", "Update Employee Information."]
    },


]).then(function (data) {
    console.log(data);
    if (data.startprompt === 'Add Department, Role, or Employee.') {
        addToCompany()
    } else if (data.startprompt === 'View Company Roster.') {
        console.log("View");
    } else if ((data.startprompt === 'Update Employee Information.')) {
        console.log("Update");
    }
});


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
        console.table(responses);
    })
}