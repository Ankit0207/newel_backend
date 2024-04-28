const mongoose = require("mongoose");


const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    dateOfJoining:{
        type: Number,
        required: true
    },
    hobbies:{
        type:[String],
        requires:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = { employeeModel };