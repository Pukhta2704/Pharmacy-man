const express = require("express")
const router = express.Router()

const { RegisterUser, LoginUser, IsTokenValid } = require("../controllers/auth.js")
const { CreateCountry, GetCountries, UpdateCountry, DeleteCountry } = require("../controllers/location/country.js")
const { CreateState, GetStates, UpdateStates, DeleteState } = require("../controllers/location/state.js")
const authenticate_user = require("../middleware/authenticateUser.js")

router.get("/countries", authenticate_user, GetCountries)
router.post("/create-country", authenticate_user, CreateCountry)
router.put("/edit-country", authenticate_user, UpdateCountry)
router.delete("/delete-country/:id", authenticate_user, DeleteCountry)

router.get("/states", authenticate_user, GetStates)
router.post("/create-state", authenticate_user, RegisterUser)
router.put("/edit-state", authenticate_user, LoginUser)
router.delete("/delete-state", authenticate_user, IsTokenValid)

router.get("/cities", authenticate_user, RegisterUser)
router.post("/create-city", authenticate_user, RegisterUser)
router.put("/edit-city", authenticate_user, LoginUser)
router.delete("/delete-city", authenticate_user, IsTokenValid)

module.exports = router
