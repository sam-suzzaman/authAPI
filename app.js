const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./router/userRouter");

// Middlewares
app.use(express.json());
app.use(cors());

// main routes
app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.send("<h1>Welcome to Authentication API</h1>");
});

module.exports = app;
