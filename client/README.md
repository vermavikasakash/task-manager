# Getting Started with Create React App

This project is made with React and project name is MACHINE TEST

## Available Scripts

To start the application you can run:

### `npm start`

# On Successful run

User will land on to the login page.

# Credentials for login

User login id -
id : vikas@gmail.com , password : Qa12345@

# If email is not registered and user tries to to login

User will get error "Email is not registered"

# If password is not wrong and user tries to to login

User will get error "Invalid credentials"

# If credentials are correct for login

User will get success message "Login successful". internally data will get stored into context api and local storage for global use.

# On successful login, user will be redirect to Home / Task(dashboard) page

On Dashboard page, user will get Welcome message name with crud operation for task.

On Dashboard page,welcome message with name are shown to check the context api functionality.

To create task - click on create task, a form will open, fill the required data and click on create task button

To view task - created tasks are visible on homepage with the following options as : View created tasks by completion status or by title search

To update or delete task - click on update or delete on particular task to edit or delete it

# For logout on Header menu, logout option is present and onclick to logout

User will get success message "Logged out Successfully" and the local storage and context api data will get cleared.
