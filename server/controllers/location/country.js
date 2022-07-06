const mongoose = require("mongoose")
const Country = require("../../db/models/Country.js")

const GetCountries = async (req, res) => {
  try {
    const { start, limit, query } = req.query
    const countries = await Country.aggregate([
      {
        $sort: {
          createdAt: -1
        }
      },
      { $skip: parseInt(start) },
      { $limit: parseInt(limit) },
      {
        $match: {
          $or: [{ name: { $regex: query, $options: "i" } }]
        }
      }
    ])
    const count = await Country.countDocuments()
    res.status(200).json({ data: countries, count })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const CreateCountry = async (req, res) => {
  try {
    const { name } = req.body.values
    if (!name) return res.status(400).json({ msg: "All fields are rquired." })
    const newCountry = new Country({
      name
    })
    await newCountry.save()
    res.json("Saved")
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const UpdateCountry = async (req, res) => {
  try {
    const { values } = req.body
    await Country.findOneAndUpdate(
      { _id: values._id },
      {
        name: values.name
      }
    )
    res.json("Edited")
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}


const DeleteCountry = async (req, res) => {
  try {
    const { id } = req.params
    const country = await Country.findById(id)
    if (country) {
      await country.remove()
    } else {
      return res.status(400).json("No Country detected")
    }
    res.status(200).json("Deleted")
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = { GetCountries, CreateCountry, UpdateCountry ,DeleteCountry}
