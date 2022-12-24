const { default: mongoose } = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const cardrSchema = mongoose.Schema({
    cardNumber:{type:String , trim:true},
    cardType:{type:String,enum:["REGULAR","SPECIAL"]},
    vision:{type:String,trim:true},
    customerID:{type:ObjectId,ref:"costomers"}
})
module.exports = mongoose.model("card" ,cardrSchema)