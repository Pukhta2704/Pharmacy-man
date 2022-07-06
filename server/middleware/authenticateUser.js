require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) return res.status(401).json({ msg: "Unauthorized." })
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) return res.status(401).json({ msg: "Unauthorized." })
      req.user = payload._id
      next()
    })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
