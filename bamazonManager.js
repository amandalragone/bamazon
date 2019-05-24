//Requiring the npm packages installed.
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// instantiate Table
var table = new Table({
    head: ['Item ID', 'Product Name', 'Department', 'Price (USD)', 'Stock Quantity']
  , colWidths: [10, 18, 18, 18, 18]
});

//Creating a connection.
var connection = mysql.createConnection({
    
    //Host and port
    host: "localhost",
    port: 3306,

    //User, password and DB.
    user: "root",
    password: "0991am03",
    database: "bamazon"

});
  
//Connecting to the DB.
connection.connect(function(err) {
    
    if (err) throw err;
    
    afterConnecting();

});

//After connecting, manager will be prompted to choose which task he would like to perform.
function afterConnecting() {

    inquirer.prompt([
        {
            name: "managerTask",
            message: "What would you like to do?",
            type: "rawlist",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ]).then(function(answer){

        switch (answer.managerTask) {

            case "View Products for Sale":

                ViewProducts();

            break;

        }

        connection.end();
    })
}

function ViewProducts() {

    var query = `
    SELECT * FROM products
    `

    connection.query(query, function(err, res) {

        if (err) throw err;

        res.forEach(function(element) {
            tableRow = [element.item_id, element.product_name, element.department_name, element.price, element.stock_quantity];
            
            table.push(tableRow);
        })

        console.log(table.toString());

    })
}