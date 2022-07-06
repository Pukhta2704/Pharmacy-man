require("dotenv").config()
const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: ObjectId,
    required: true
  },
  state: {
    type: ObejctId,
    required: true
  },
  city: {
    type: ObjectId,
    required: true
  },
  grade: {
    type: Number,
    required: true
  }
},
  { timestamps: true }
)
module.exports = Company = mongoose.model("Company", companySchema)
