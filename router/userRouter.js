const express = require("express");
const userRouter = express.Router();

// controllers
const {
    registerUserHandler,
    userLoginHandler,
} = require("../controller/userController");

// Routes
userRouter.post("/register", registerUserHandler);
userRouter.post("/login", userLoginHandler);

module.exports = userRouter;
