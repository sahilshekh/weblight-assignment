
const mongoose = require("mongoose");

const PhoneSchema = new mongoose.Schema({
    name:{type:String,required:true},
    os:{type:String,required:true},
    launch_date:{type:String,required:true},
    screen:{type:Number,required:true},
    display:{type:String,required:true},
    camera:{type:Object,required:true},
    PPI:{type:Number,required:true},
    storage:{type:String, required:true},
    sdCard:{type:String,required:true},
    ram:{type:Number,required:true},
    chipset:{type:String, required:true},
    processor:{type:String,required:true},
    weight:{type:Number, required:true},
    battery:{type:Number,required:true},
    price:{type:Number, required:true},
    images:[{type:String,required:true}],
},
    {
        versionKey:false,
        timestamps:true
    }
)

module.exports = mongoose.model("phone",PhoneSchema)