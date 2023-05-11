const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({
            sucess: true,
            data: tasks
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, error: "Something went wrong"});
    }
})

// post task
router.post("/", async (req, res) => {
    try {
        const task = new Task({
            text: req.body.text
        });

        const saved = await task.save();

        res.json({
            success: true,
            data: saved
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: true, error: "Something went wrong"});
    }
});

// delete task
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({success: true});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: true, error: "Something went wrong"}); 
    }
});

module.exports = router;
