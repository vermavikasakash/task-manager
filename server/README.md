# Getting Started with Backend

This project is made with Node,Express and Mongodb, database name is "machine-test"

## Available Scripts

To start the database application you can run:

### `npm start`

# On Successful run

in console we will get success massage.

# Project structure

Backend follows the MVC pattern which basically contains some function for registration, login, logout, middleware based on token and CRUD operation for task creation.

-1) config folder - it will contain function to connect to db
-2) controller folder - it will contain all the functions related with the routes
-3) helpers folder - it will contain function to encrypt the password, compare the password
-4) middlewares folder - used for authorization to access pages
-5) models folder - it will contain function to connect with the collections in the db
-6) routes folder - it will contain the routes of application
-7) server.js - main application file to run the backend operation
