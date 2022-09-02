const mongoose = require("mongoose");

const Cartschema = new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    inPrice:{type:Number, required:true},
    upPrice:{type:Number,required:true},
    count:{type:Number,required:true},},
    {
        versionKey:false,
        timestamps:true
    }
)

module.exports = mongoose.model("cart",Cartschema)