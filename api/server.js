const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const tasksRouter = require("./routes/tasks");
const connectDB = require("./config/db");

connectDB();

const app = express();

// static folder
app.use(express.static(path.join(__dirname, "../public")));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// cores middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true
}));

app.get("/", () => {
    console.log({message: "welcome to the list api"});
});

app.use("/api/tasks", tasksRouter);

app.listen(port, () => console.log(`server listening on port: ${port}`));
