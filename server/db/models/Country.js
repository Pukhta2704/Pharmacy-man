require("dotenv").config()
const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const countrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)
module.exports = Country = mongoose.model("Country", countrySchema)
