const mongoose = require("mongoose");
const { DB_LINK } = require("../config/secrets");
const crypto = require("crypto")
// mongoose.set('strictQuery', true);
mongoose
.connect(DB_LINK)
.then((db) => {
    console.log("connected to database");
})

let userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        minlength : [6,"Password should be greater than 6"],
        required : true
    },
    confirmPassword : {
        type : String,
        minlength : [6 , "Password should be greater than 6"],
        validate : {
            validator : ()=>{
                return this.password == this.confirmPassword ;
            },
            message : "Password didn't match!"
        }
    },
    // pwToken : String,
    // tokenTime : String,
})

// userSchema.pre("save" , function(){
//     this.confirmPassword = undefined;
// })

// userSchema.methods.createResetToken = function(){
//     let token = crypto.randomBytes(32).toString("hex");
//     let time = Date.now() * 60 * 1000;
//     this.pwToken = token;
//     this.tokenTime = time;

//     return token
// }

// userSchema.methods.resetPasswordHandler = function(password , confirmPassword){
//     this.pwToken = undefined;
//     this.tokenTime = undefined;
//     this.password = password;
//     this.confirmPassword = confirmPassword;
// }

let userModel = mongoose.model("user" , userSchema);
module.exports = userModel;