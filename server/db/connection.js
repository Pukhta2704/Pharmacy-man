require("dotenv").config()
const mongoose = require("mongoose")
const connect = async () => {
  await mongoose.connect(
    process.env.MONGO_CONNECTION,
    {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true
    },
    () => console.log("db connected")
  )
}
connect()
