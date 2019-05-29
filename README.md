# bamazon

## What is it?

Bamazon is an Amazon-like storefront that simulates customer, manager, and supervisor actions in the store. This app is used in the command line.

### Customer Actions:

type:  node customer.js

The customer will be prompted to select from the table of products what product and quantity of the product they would like to purchase. If the quantity is more than what is in stock, the customer will be alerted.

### Manager Actions:

type: node manager.js

The manager will be prompted to choose to view all the products in a table, view what products are low in stock, add more of a product already in the store, or add a new product to the store.

### Supervisor Actions:

type: node supervisor.js

The supervisor will be prompted to choose to view all product sales by department or create a new department.

## What you will need?

You will need to clone this repo, set up your own package.json, install npm packages for mysql, inquirer, console.table, and in mysql workbench paste the info in bamazon.sql.

## What was used to make this app?

Javascript, Node, Inquirer NPM, mySql workbench, mySql NPM, and console.table NPM

## Video to see app working: