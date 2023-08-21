const userModel = require("../Model/usersModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, GMAIL_ID, GMAIL_PW } = require("../config/secrets");
const nodemailer = require("nodemailer");

async function signup(req , res){
    try {
        let newUser = req.body;
        let user = await userModel.create({
            name : newUser.name,
            email : newUser.email,
            password : newUser.password,
            confirmPassword : newUser.confirmPassword,
        })
        res.status(201).json({
            message : "Successfully signed up!",
            data : user
        }) 
    } catch (error) {
        res.status(501).json({
            message : "could not sign up !",
            error
        })
    }
}

async function login(req , res){
    try {
        let {email , password} = req.body;
        let loggedinUser = await userModel.find({email});
        if (loggedinUser.length) {
            let user = loggedinUser[0];
            if(user.password == password){
                const token = jwt.sign({ id : user["_id"]} , SECRET_KEY);
                res.cookie("jwt" , token , {httpOnly : true});
                res.status(200).json({
                    message : "Successfully logged In!",
                    data : user,
                    token
                })
            }else{
                res.status(200).json({
                    message : "Email and password did not match!"
                })
            }
        } else {
            res.status(200).json({
                message : "No user found!Please sign up first"
            })
        }
    } catch (error) {
        res.status(501).json({
            message : "Login Failed!"
        })
    }
}

async function isLoggedIn(req , res , next){
    try {
        const token = req.cookies.jwt;
        let payLoad =jwt.verify(token , SECRET_KEY);
        if(payLoad){
            let user = await userModel.findById(payLoad.id);
            req.name = user.name;
            req.user = user;
            next();
        }else{
            next();
        }
    } catch (error) {
        next();
    }
}

async function logout(req , res){
    try {
        res.clearCookie("jwt");
        res.redirect("/");
    } catch (error) {
        res.status(501).json({
            error
          })
    }
}

async function protectRoute(req , res , next){
    try {
        const token = req.cookies.jwt;
        let payLoad = jwt.verify(token , SECRET_KEY);
        if (payLoad) {
            req.id = payLoad.id;
            next()
        } else {
            res.status(200).json({
                message : "Please Login to Proceed!"
            })
        }
    } catch (error) {
        res.status(501).json({
            message : "Please Login to Proceed!",
            error
        })
    }
}

async function isAuthenticated(req , res , next){
    try {
        const id = req.id
        let user = await userModel.findById(id);
        if (user.role == "admin") {
            next();
        } else {
            res.status(200).json({
                message : "You are not authorized!"
            })
        }

    } catch (error) {
        res.status(501).json({
            message : "Failed to authenticate",
            error
        })
    }
}

async function send(message) {

    try {
        let transporter = nodemailer.createTransport({
            service : "gmail",
            host: "smtp.ethereal.email",
            secure: true,
            auth: {
              user: GMAIL_ID,
              pass: GMAIL_PW, 
            },
          });

          let info = await transporter.sendMail({
            from: message.from, 
            to: message.to,
            subject: message.subject, 
            text: message.text,

          });
        
          console.log("Message sent: %s", info.messageId);
        
    } catch (error) {
        console.log(error);
    }
}

async function forgetPassword(req , res){

    try {
        let {email} = req.body;
        let user = await userModel.findOne({email : email});
        if(user){
            const token = user.createResetToken();
            await user.save();
            let resetLink = `http://localhost:3000/resetpassword/${token}`;
            let message = {
                from : GMAIL_ID,
                to : email,
                subject : "Password Reset Link",
                text : `Here is your password reset link : ${resetLink} \n This link is valid for 10mins only`
            }
            let response = await send(message);
            res.status(200).json({
                message : "Reset link sent to email!",
                response
            })
        }else{
            res.status(200).json({
                message:"User Not Found ! Please Sign up first !"
              })
        }
    } catch (error) {
        res.status(501).json({
            message : "Failed to forget password",
            error
        })
    }

}

async function resetPassword(req , res){
    try {
        const {token} = req.params;
        const { password , confirmPassword } = req.body;
        let user = await userModel.findOne({
            pwToken : token,
            tokenTime : { $gt : Date.now()}
        })
        if(user){
            user.resetPasswordHandler(password , confirmPassword);
            await user.save();
            res.status(200).json({
                message : "Reset password successful!",
                flag : true
            })
        }else{
            res.status(200).json({
                message : "Reset link expired!",
                flag : false
            })
        }
    } catch (error) {
        res.status(501).json({
            message : "Reset failed!",
            error
        })
    }
}

module.exports.signup = signup;
module.exports.login = login;
module.exports.protectRoute = protectRoute;
module.exports.isAuthenticated = isAuthenticated;
module.exports.forgetPassword = forgetPassword;
module.exports.resetPassword = resetPassword;
module.exports.isLoggedIn = isLoggedIn;
module.exports.logout = logout