const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  getTasksController,
  postTaskController,
  updateTasksController,
  deleteTasksController,
} = require("../controllers/authController");
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routing
// ! REGISTER  (METHOD POST)
router.post("/register", registerController);

// ! LOGIN  (METHOD POST)
router.post("/login", loginController);

// ! LOGOUT  (METHOD POST)
router.post("/logout", logoutController);

// ! TASK  (METHOD POST)
router.post("/postTasks", requireSignIn, postTaskController);

// ! TASK  (METHOD GET)
router.get("/getTasks", requireSignIn, getTasksController);

// ! TASK  (METHOD PUT)
router.put("/updateTasks/:id", requireSignIn, updateTasksController);

// ! TASK  (METHOD DELETE)
router.delete("/deleteTasks/:id", requireSignIn, deleteTasksController);

// !protected rotes auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
