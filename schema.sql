--If a DB named "bamazon" already exists, it will be deleted.
DROP DATABASE IF EXISTS bamazon;

--Now, a new DB "bamazon" will be created and selected.
CREATE DATABASE bamazon;
USE bamazon;

--A table "products" will be created within the DB "bamazon".
CREATE TABLE products (
    item_id INTEGER NOT NULL auto_increment,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(30),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

--Then, the table (even though it's still empty) will be read and displayed to the user.
SELECT * FROM products;