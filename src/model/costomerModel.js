const { default: mongoose } = require("mongoose")

const costomerSchema = mongoose.Schema({
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    mobileNumber: { type: String, trim: true },
    DOB: { type: String, trim: true },
    emailID: { type: String, trim: true },
    customerID: { type: String, trim: true },
    status: { type: String, trim: true },
    isDelete: { type: Boolean, default: false }
})
module.exports = mongoose.model("costomers", costomerSchema)