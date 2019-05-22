--Select and open the "bamazon" DB. 
USE bamazon;

--Confirm what's already inside the "products" table.
SELECT * FROM products;

--Insert 10 products into the "products" table.
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dress", "Women's Clothes", 25.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pants", "Men's Clothes", 20.00, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bodysuit", "Baby Clothes", 10.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Board Game", "Toys and Games", 16.50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Doll", "Toys and Games", 10.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cellphone", "Technology", 399.00, 33);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Computer", "Technology", 579.99, 56);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tablet", "Technology", 160.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Couch", "Furniture", 1757.70, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Picture Frame", "Decor", 5.99, 16);

--Confirm that table has been updated.
SELECT * FROM products;

