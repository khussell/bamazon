DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE	bamazon_db;
USE bamazon_db;

CREATE TABLE products(
item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,	
price DECIMAL(10, 2) NULL,
stock_quantity INTEGER(10),
PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Flamingo Pool Float", "Outdoor", 2.00, 10),
       ("Sunscreen", "Health & Beauty", 8.00, 100),
	   ("Beach Towel", "Home", 15.00, 40),
       ("Cooler", "Outdoor", 35.00, 20),
       ("Watermelon", "Grocery", 5.00, 30),
       ("Waterproof Speaker", "Electronics", 60.00, 10),
       ("Beach Umbrella", "Outdoor", 25.00, 20),
       ("Flip Flops", "Shoes", 5.00, 25),
       ("Pina Colada Mix", "Grocery", 9.00, 20),
       ("Rum", "Liquor", 30.00, 15);
       
SELECT * FROM products;
       