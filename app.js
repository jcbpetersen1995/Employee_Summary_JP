const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let myTeam = [];

function questionOne() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the employee?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the ID of the employee?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the email of the employee?"
            },
            {
                type: "list",
                name: "role",
                message: "What is the role of the employee?",
                choices: [
                    "Engineer",
                    "Manager",
                    "Intern"
                ]
            }
        ]).then(function(ans) {
            questionTwo(ans);
        })
};

function questionTwo(answers) { 
    let value;
    let Role;
    if(answers.role == "Engineer") {
         value = "Github username";
         Role = Engineer;
    } else if(answers.role == "Manager") {
         value = "office number";
         Role = Manager;
    } else {
         value = "school";
         Role = Intern;
    };
    console.log(value)
    inquirer
        .prompt([
            {
                type: "input",
                name: "unique",
                message: `What is the employee's ${value}?`
            }
        ]).then(function(ans) {
            const emp = new Role(answers.name, answers.id, answers.email, ans.unique);
            myTeam.push(emp);
            questionThree();
        })
};

function questionThree() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "new",
            message: "Do you want to add another employee?",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]).then(function(ans) {
        if(ans.new == "Yes") {
            questionOne();
        } else {
            const html = render(myTeam);
            fs.writeFile(outputPath, html, function(err) {
                if (err) throw err;
            })
        }
    })
};

questionOne();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
