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
    purchase();
});

var purchase = function(){
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
        inquirer.prompt([{
            message: "What is the id of the product you would like to buy?",
            type: "input",
            name: "whatProductID"
        },{
            message: "Quantity of product you would like to purchase?",
            type: "input",
            name: "whatProductQuantity"
        }]).then(function(answer){
            var query = "SELECT * FROM products WHERE products.item_id = " + answer.whatProductID
            connection.query(query, function(err, res){
                if(err) throw err;
                if(answer.whatProductQuantity > res[0].stock_quantity){
                    console.log("Insufficient quantity!")
                    connection.end();
                }else{
                    var newQuantity =  res[0].stock_quantity - answer.whatProductQuantity;
                    var purchaseCost = answer.whatProductQuantity * res[0].price
                    var productSales = res[0].product_sales + (purchaseCost)
                    
                    connection.query("UPDATE products SET ? WHERE ?",
                    [
                      {
                        product_sales: productSales
                      },
                      {
                        item_id: answer.whatProductID 
                      }
                    ], function(err, res){
                        if (err) throw err;
                    })

                    connection.query("UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: newQuantity
                      },
                      {
                        item_id: answer.whatProductID 
                      }
                    ], function(err, res){
                        if (err) throw err;
                        console.log(res.affectedRows + " product updated!\n")
                        console.log("Your total is: $" + purchaseCost)
                        connection.end()
                    })
                }
            })
        })
    })
}