const express = require("express")
const router = express.Router()

const { RegisterUser, LoginUser, IsTokenValid } = require("../controllers/auth.js")
const authenticate_user = require("../middleware/authenticateUser.js")

router.post("/register", RegisterUser)

router.post("/login", LoginUser)

router.post("/isUserLoggedIn", authenticate_user, IsTokenValid)

module.exports = router
