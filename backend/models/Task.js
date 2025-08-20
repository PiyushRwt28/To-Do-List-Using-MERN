const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
