require("dotenv").config()
const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const citySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: ObjectId,
    required: true,
    ref: "State"
  }
},
  { timestamps: true }
)
module.exports = City = mongoose.model("City", citySchema)
