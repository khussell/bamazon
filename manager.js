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

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected as id: " + connection.threadId + '\n')
    options();
});

var options = function(){
    inquirer.prompt({
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "managerOptions"
    }).then(function(answer){
        switch(answer.managerOptions){
            case "View Products for Sale":
                viewProduct()
                break;
            case "View Low Inventory":
                viewLowInventory()
                break;
            case "Add to Inventory":
            case "Add New Product":

        }
    })
}

var viewProduct = function(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        var productArr= [['item_id', 'product_name', 'department_name', 'price', 'stock_quantity']];
        for (var i = 0; i< res.length; i ++){
         var newProductArr = [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity ];
         productArr.push(newProductArr)
        }
        console.log("\n----------------------------------------------------------------------\n")
        console.log("Bamazon Products: ")
        console.log("\n----------------------------------------------------------------------\n")
        console.table(productArr[0], productArr.slice(1))
        console.log("----------------------------------------------------------------------\n")
        connection.end()
    })
}

var viewLowInventory = function(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 15", function(err, res){
        if(err) throw err;
        console.log("\nItems with low inventory:\n-------------------------")
        
        for (var i = 0; i < res.length; i++){
            console.log(res[i].product_name)
        }
        connection.end()
    })
}