const { hashPassword, comparePassword } = require("../helpers/authHelper");
const { User, Task } = require("../models/userModel");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //! validations
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }

    if (!password) {
      return res.send({ error: "password is required" });
    }

    //   ! check user if already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    //   !  if new user then register and save
    const hashPass = await hashPassword(password);
    //   ? save
    const user = await new User({
      name,
      email,
      password: hashPass,
    }).save();
    res
      .status(200)
      .send({ success: true, message: "User Registered Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// ! LOGIN (Post) CONTROLLER

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Email is not registered" });
    }

    const matched = await comparePassword(password, user.password);
    if (!matched) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id,
      },
      token: `Bearer ${token}`, // Include "Bearer " prefix
    });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .send({ success: false, message: "Internal Server Error", error });
  }
};

//? TEST TOKEN
const testController = (req, res) => {
  res.send("Token working");
};

// ? LOGOUT CONTROLLER

const logoutController = (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully", token: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logout error", error });
  }
};

//? TASK CREATION
const postTaskController = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const userId = req.user.id;
    const newTask = new Task({ title, description, priority, userId });
    await newTask.save();
    res
      .status(200)
      .send({ success: true, message: "Task Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Task Creation",
      error,
    });
  }
};

//? GET TASKS

const getTasksController = async (req, res) => {
  try {
    const userId = req.user.id;
    let data = await Task.find({ userId });
    res
      .status(200)
      .send({ success: true, message: "Tasks fetched successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can't find task",
      error,
    });
  }
};

//? UPDATE TASK

const updateTasksController = async (req, res) => {
  try {
    const userId = req.user.id;
    const _id = req.params.id;
    let updatedTask = await Task.findOneAndUpdate({ _id, userId }, req.body, {
      new: true,
    });
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res
      .status(200)
      .send({ success: true, message: "Tasks updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can't update task",
      error,
    });
  }
};

//? DELETE TASK

const deleteTasksController = async (req, res) => {
  try {
    const userId = req.user.id;
    const _id = req.params.id;
    let deletedTask = await Task.findOneAndDelete({ _id, userId });
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });
    res
      .status(200)
      .send({ success: true, message: "Tasks deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can't delete task ",
      error,
    });
  }
};

// ! EXPORTS
module.exports = {
  registerController,
  loginController,
  logoutController,
  testController,
  postTaskController,
  getTasksController,
  updateTasksController,
  deleteTasksController,
};
