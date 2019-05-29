DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE	bamazon_db;
USE bamazon_db;

CREATE TABLE products(
item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,	
price DECIMAL(10, 2) NULL,
stock_quantity INTEGER(10),
product_sales DECIMAL(10,2),
PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Flamingo Pool Float", "Outdoor", 2.00, 10,0),
       ("Sunscreen", "Health & Beauty", 8.00, 100,0),
	   ("Beach Towel", "Home", 15.00, 40,0),
       ("Cooler", "Outdoor", 35.00, 20,0),
       ("Watermelon", "Grocery", 5.00, 30,0),
       ("Waterproof Speaker", "Electronics", 60.00, 10,0),
       ("Beach Umbrella", "Outdoor", 25.00, 20,0),
       ("Flip Flops", "Shoes", 5.00, 25,0),
       ("Pina Colada Mix", "Grocery", 9.00, 20,0),
       ("Rum", "Liquor", 30.00, 15,0);
       
SELECT * FROM products;

CREATE TABLE departments(
department_id INTEGER(10) NOT NULL AUTO_INCREMENT,
department_name VARCHAR(100),
over_head_costs DECIMAL(10,2),
PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name, over_head_costs)
VALUES("Home", 100.00),
	   ("Outdoor", 70.00),
       ("Health & Beauty", 40.00),
       ("Grocery", 90.00),
       ("Electronics", 100.00),
       ("Shoes", 30.00),
       ("Liquor", 50.00);
       
SELECT * FROM departments;
       