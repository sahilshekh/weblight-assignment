const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SigninSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},},
    {
        versionKey:false,
        timestamps:true
    }
)

SigninSchema.pre("save", function (next) {

    let hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
});

module.exports = mongoose.model("signin",SigninSchema)