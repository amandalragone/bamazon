//Requiring the npm packages installed.
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// instantiate
var table = new Table({
    head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
  , colWidths: [20, 20, 20, 20, 20]
});
 
console.log(table.toString());

//functions

function Product(item_id, product_name, department_name, price, stock_quantity) {
    this.item_id = item_id;
    this.product_name = product_name;
    this.department_name = department_name;
    this.price = price;
    this.stock_quantity = stock_quantity;
}

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


//Reading items that are in the DB and showing them in the terminal.
function afterConnecting() {

    query = `
    SELECT * FROM products
    `;
    
    connection.query(query, function(err, res) {

        if (err) throw err;

        res.forEach(function(element) {
            tableRow = [element.item_id, element.product_name, element.department_name, element.price, element.stock_quantity];

            table.push(tableRow);
        })

        console.log(table.toString());


    });
    

}


