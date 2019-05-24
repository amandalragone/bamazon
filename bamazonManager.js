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

                viewProducts();

            break;

            case "View Low Inventory":

                viewLowInventory();

            break;

            case "Add to Inventory":

                addToInventory();

            break;

            case "Add New Product":

                addNewProduct();

            break;

            case "Exit":

                connection.end();
            
            break;

        }  
    })
}

//If the manager selects "View Products for Sale", this function will run and display all the products contained in the products table.
function viewProducts() {

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

    connection.end();
}

//If the manager chooses to view low inventory, this function will run and will display all items with stock quantity < 5.
function viewLowInventory() {

    var query = `
    SELECT * FROM products WHERE stock_quantity < '5'
    `

    connection.query(query, function(err, res) {

        if (err) throw err;

        res.forEach(function(element) {
            tableRow = [element.item_id, element.product_name, element.department_name, element.price, element.stock_quantity];

            table.push(tableRow);
        })

        console.log(table.toString());
    })

    connection.end();
}

//If the manager wants to replenish the stock for an existing item, this function will run.
function addToInventory() {

    //First, the function will check out what are the products available in the products table.
    var query = `
    SELECT * FROM products
    `

    connection.query(query, function(err, res){

        if (err) throw err;

        productName = [];

        res.forEach(function(element){
            productName.push(element.product_name);
        });

        //Then, it will ask the manager which of those items need to be updated and how many items should be added to stock.
        inquirer.prompt([
            {
                name: "itemToUpdate",
                message: "Which item would you like to update?",
                type: "rawlist",
                choices: productName,
                pageSize: productName.length + 1
            },
            {
                name: "itemQuantity",
                message: "How many items would you like to add?"
            }
        ]).then(function(answer){
    
            //Then, it will select the specific row where the item is located.
            var query = `
            SELECT stock_quantity FROM products WHERE product_name = '${answer.itemToUpdate}';
            `
        
            connection.query(query, function(err, res) {
                if (err) throw err;

                //Once the row is selected, it will calculate the new quantity in stock and will update that specific row in the table.
                stockQuantity = parseInt(res[0].stock_quantity);

                console.log(stockQuantity);

                stockTotal = stockQuantity + parseInt(answer.itemQuantity);

                console.log(stockTotal);
    
                var query = `
                UPDATE products SET stock_quantity = '${stockTotal}' WHERE product_name = '${answer.itemToUpdate}';
                ` 
                    
                connection.query(query, function(err, res) {
                
                    if (err) throw err;
    
                    console.log(res.affectedRows + " products updated!\n");
                
                });   
                connection.end();    

            });
             
        });

    });
    
}

//If the manager wants to add a brand new product, this function will run and then update the database.
function addNewProduct(){

    inquirer.prompt([
        {
            name: "product",
            message: "Which product would you like to add?"
        },
        {
            name: "department",
            message: "Which department should this product be placed under?"
        },
        {
            name: "price",
            message: "How much does it cost?"
        },
        {
            name: "stock",
            message: "How many items would you like to add?"
        }
    ]).then(function(answer){

        var query = `
        INSERT INTO products (product_name, department_name, price, stock_quantity)
        VALUES ('${answer.product}', '${answer.department}', '${answer.price}', '${answer.stock}')
        `

        connection.query(query, function(err, res){
            if(err) throw err;

            console.log(answer.product + " was added successfully to the Database!");
        });
        connection.end();

    })
}

