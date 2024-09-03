# E-COMM-mod13
This project is a back-end API for an e-commerce site built with Express.js and Sequelize, connected to a PostgreSQL database. It includes CRUD operations for categories, products, and tags.

Table of Contents
Overview
Features
Getting Started
Database Setup
API Routes
Testing
Technologies Used
Deployment
Contact
Overview
The E-commerce Back End API provides functionality for managing categories, products, and tags for an e-commerce platform. It uses Sequelize to interact with a PostgreSQL database and includes routes for creating, reading, updating, and deleting data.

Features
Categories: Manage product categories with CRUD operations.
Products: Manage products, including their association with categories and tags.
Tags: Manage tags and their association with products.
Associations: Products belong to categories and can have multiple tags; tags can be associated with multiple products.
Getting Started
To get the project up and running on your local machine, follow these steps:

Clone the repository:
git clone https://github.com/arizvi-prog/E-COMM-mod13.git
Navigate to the project directory:
cd E-COMM-mod13
Install dependencies:
npm install
Create a .env file in the root directory with the following content:
DB_NAME=your_database_name
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
Create the database schema: Open the PostgreSQL shell and execute the commands from schema.sql located in the db folder.

Seed the database:
npm run seed
Start the server:
npm start

Open your API client (e.g., Insomnia Core) to test the API routes.

Database Setup
Schema Creation: Run the schema commands from schema.sql in the PostgreSQL shell to set up the database.
Seeding: Use npm run seed to populate the database with test data.
API Routes
Categories
GET /api/categories: Retrieve all categories.
GET /api/categories/
: Retrieve a category by ID.
POST /api/categories: Create a new category.
PUT /api/categories/
: Update a category by ID.
DELETE /api/categories/
: Delete a category by ID.
Products
GET /api/products: Retrieve all products.
GET /api/products/
: Retrieve a product by ID.
POST /api/products: Create a new product.
PUT /api/products/
: Update a product by ID.
DELETE /api/products/
: Delete a product by ID.
Tags
GET /api/tags: Retrieve all tags.
GET /api/tags/
: Retrieve a tag by ID.
POST /api/tags: Create a new tag.
PUT /api/tags/
: Update a tag by ID.
DELETE /api/tags/
: Delete a tag by ID.
Testing
A walkthrough video demonstrating the following should be submitted:

Creating the schema from the PostgreSQL shell.
Seeding the database from the command line.
Starting the server.
Testing GET, POST, PUT, and DELETE routes for categories, products, and tags in Insomnia Core.
Watch the Walkthrough Video

Technologies Used
Express.js: For building the API server.
Sequelize: For ORM and database interactions.
PostgreSQL: For the database.
dotenv: For managing environment variables.
Deployment
The application is intended to be run locally for development and testing. For deployment instructions, follow the guidelines provided in the challenge specifications.

Contact
For any questions or inquiries, please reach out to:

GitHub: github.com/arizvi-prog
LinkedIn: linkedin/alisharizvii
Thank you for checking out my e-commerce back end project!

