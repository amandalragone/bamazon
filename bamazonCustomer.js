//Requiring the npm packages installed.
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// instantiate
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


//Reading items that are in the DB and showing them in the terminal.
function afterConnecting() {

    query = `
    SELECT * FROM products
    `;
    
    connection.query(query, function(err, res) {

        if (err) throw err;

        var productName = [];

        res.forEach(function(element) {
            tableRow = [element.item_id, element.product_name, element.department_name, element.price, element.stock_quantity];
            
            table.push(tableRow);

            productName.push(element.product_name);
        })

        console.log(table.toString());

            inquirer.prompt([{
                name: "userChoice",
                message: "What product would you like to choose?",
                type: "rawlist",
                choices: productName,
                pageSize: productName.length + 1
            },
            {
                name: "quantity",
                message: "How many would you like to buy?"
            }]).then(function(answer){
                console.log("You've just bought " + answer.quantity + " " + answer.userChoice);
        
                connection.end();
            });

    });
    
}


