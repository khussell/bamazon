var inquirer = require("inquirer");
var cTable = require('console.table')
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'flamingo3',
    database: 'bamazon_db'
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log("Connected as id: " + connection.threadId + '\n')
    options();
});

var options = function () {
    inquirer.prompt({
        name: "options",
        message: "What would you like to do?",
        type: "rawlist",
        choices: ["View Product Sales by Department", "Create New Department"]
    }).then(function (answer) {
        switch (answer.options) {
            case "View Product Sales by Department":
                viewSales();
                break;
            case "Create New Department":
                createDepartment();
                break;
        }
    })
}

var viewSales = function () {
    connection.query("SELECT departments.department_id, products.department_name, departments.over_head_costs, products.product_sales FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_id ORDER BY departments.department_id ", function (err, res) {
        if (err) throw err;



        var columns = [['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit']];
        for (var i = 0; i < res.length; i++) {
            var totalProfit = res[i].product_sales - res[i].over_head_costs
            var newDepartmentArr = [res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, totalProfit];
            columns.push(newDepartmentArr)
        }
        console.log("\n----------------------------------------------------------------------------\n")
        console.log("Product Sales by Deparment: ")
        console.log("\n----------------------------------------------------------------------------\n")
        console.table(columns[0], columns.slice(1))
        console.log("----------------------------------------------------------------------------\n")
        connection.end()
    })
}

var createDepartment = function () {
    inquirer.prompt([{
        type: "input",
        message: "What would you like to name the department?",
        name: "name"
    }, {
        type: "number",
        message: "What is the overhead costs of the department?",
        name: "overhead"
    }]).then(function (answer) {
        connection.query("INSERT INTO departments SET ?",
            {
                department_name: answer.name,
                over_head_costs: answer.overhead,
            }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " new department added!")
                connection.end();
            })
    })
}