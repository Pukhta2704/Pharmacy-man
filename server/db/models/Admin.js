const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)
module.exports = Admin = mongoose.model("Admin", adminSchema)
