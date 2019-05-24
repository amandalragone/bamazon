//Requiring the npm packages installed.
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var productName;

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


//Reading items that are in the DB and showing them in the terminal.
function afterConnecting() {

    query = `
    SELECT * FROM products
    `;
    
    connection.query(query, function(err, res) {

        if (err) throw err;

        productName = [];

        res.forEach(function(element) {
            tableRow = [element.item_id, element.product_name, element.department_name, element.price, element.stock_quantity];
            
            table.push(tableRow);

            productName.push(element.product_name);
        })

        console.log(table.toString());

        //After showing the table in the terminal, the app will allow the user to purchase a product.
        orderProduct();

    });
    
}

//Function that allows users to purchase products.
function orderProduct() {

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

        //App will check how many items are in stock and decide if the quantity is enough or not.
        var query = `
        SELECT price, stock_quantity FROM products WHERE product_name = '${answer.userChoice}';
        `
        
        connection.query(query, function(err, res) {

            if (err) throw err;

            var stockQuantity = res[0].stock_quantity;
            var price = res[0].price;
            var total = (price * answer.quantity).toFixed(2);

            //If the quantity is enough, the app will allow the user to purchase the product and will end the connection. If not, it will ask th user to start again.
            if (stockQuantity > answer.quantity) {
                console.log("You've just bought " + answer.quantity + " " + answer.userChoice + ". Your total is " + total);

                totalStock = stockQuantity - answer.quantity;

                query = `
                UPDATE products SET stock_quantity = '${totalStock}' WHERE product_name = '${answer.userChoice}';
                ` 
                
                connection.query(query, function(err, res) {
                    if (err) throw err;

                    console.log(res.affectedRows + " products updated!\n");
                })
                connection.end();
            } else {
                console.log("Insufficient quantity! Please start a new order.");
                orderProduct();
            }
        });

    });

}

