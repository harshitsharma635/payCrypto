const express = require("express");
const userRouter = require("./Router/userRouter");
//const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());//a middleware that fills the empty req.body from the incoming request

//app.use(cookieParser())

app.use("/api" , userRouter);

app.listen(3000 , function(){
    console.log("server started at port 3000");
})

//mailtrap , nodemailer
//xdklpwziiddbyrrd