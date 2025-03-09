const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    priority: {
      type: String,
      trim: true,
      required: true,
      enum: ["High", "Medium", "Low"],
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
const Task = mongoose.model("Task", taskSchema);

module.exports = { User, Task };

//timestamps is used to get details when user is created
