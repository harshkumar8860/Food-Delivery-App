const express = require("express");

const userRouter = express.Router();

const {userRegister,userLogin} = require("../controllers/userController");

userRouter.post("/user/register",userRegister);

userRouter.post("/user/login",userLogin);

module.exports = userRouter;