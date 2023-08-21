const express = require("express");
const { signup, login, protectRoute, forgetPassword, resetPassword } = require("../Controller/authController");

const userRouter = express.Router();

const {
    getUserById,
} = require("../Controller/userController")

userRouter.post("/signup" , signup);
userRouter.post("/login" , login);
userRouter.post("/forgetpassword" , forgetPassword);
userRouter.patch("/resetpassword/:token", resetPassword);

//userRouter.use(protectRoute);

userRouter.route("")
.get(getUserById)




module.exports = userRouter;