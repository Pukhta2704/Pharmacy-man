require("dotenv").config()
const express = require("express")
const cors = require("cors")
const AuthRoutes = require("./routes/auth.js")
const LocationRoutes = require("./routes/location.js")

require("./db/connection")

const app = express()

// only for development
app.use(cors())

app.use(express.json({ limit: "7mb" }))

app.use("/api/admin/auth/", AuthRoutes)
app.use("/api/admin/location/", LocationRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`))
