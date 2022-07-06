require("dotenv").config()
const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const stateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: ObjectId,
    ref: "Country"
  }
},
  { timestamps: true }
)
module.exports = State = mongoose.model("State", stateSchema)
