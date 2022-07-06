require("dotenv").config()
const mongoose = require("mongoose")
const Admin = require("../db/models/Admin.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const RegisterUser = async (req, res) => {
  try {
    const { name, username, password, email, address } = req.body
    if (!name || !username || !password || !email || !address)
      return res.status(400).json({ msg: "All fields are required." })
    const doesExist = await Admin.findOne({ email })
    if (doesExist) return res.status(400).json({ msg: "User already exists." })
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new Admin({
      name,
      username,
      password: hashedPassword,
      email,
      address
    })
    const saved = await user.save()
    const token = jwt.sign({ _id: saved._id }, process.env.SECRET_KEY)

    res.status(200).json({ msg: "Signed up successfully.", token })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = { RegisterUser }

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ msg: "All fields are required." })
    const doesExist = await Admin.findOne({ email })
    if (!doesExist) return res.status(400).json({ msg: "Invalid credentials." })
    const isMatch = await bcrypt.compare(password, doesExist.password)
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." })
    const token = jwt.sign({ _id: doesExist._id }, process.env.SECRET_KEY)
    res.status(200).json({ msg: "Signed in successfully.", token })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const IsTokenValid = async (req, res) => {
  try {
    res.send(true)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = { RegisterUser, LoginUser, IsTokenValid }
