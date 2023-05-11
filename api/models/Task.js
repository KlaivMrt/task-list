const  mongoose = require("mongoose");


const TaskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Describe your task"]
    }
});

module.exports = mongoose.model("Task", TaskSchema);
