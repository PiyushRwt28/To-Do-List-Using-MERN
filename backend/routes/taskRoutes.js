const express = require("express");
const route = express.Router();

const Task = require("../models/Task");
const auth = require("../middleware/auth");

route.post("/tasks", auth, async (req, res) => {

    const { title } = req.body;
    const userId = req.user._id;

    const newtask = await Task.create({
        title,
        user: userId
    });

    res.send(newtask);

});


route.get("/tasks", auth, async (req, res) => {

    const userId = req.user._id;

    const tasks = await Task.find({ user: userId });

    res.send(tasks);

});

route.put("/tasks/:id", auth, async (req, res) => {

    const taskid = req.params.id;
    const updateData = req.body;

    const updateTask = await Task.findByIdAndUpdate(taskid, updateData, { new: true });

    res.send(updateTask)

})

route.delete("/tasks/:id", auth, async (req, res) => {

    const taskid = req.params.id;

    await Task.findByIdAndDelete(taskid);

    res.send({ message: "Task deleted successfully" });

})

module.exports = route;
