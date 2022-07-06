const mongoose = require("mongoose")
const State = require("../../db/models/State.js")

const GetStates = async (req, res) => {
  try {
    const { start, limit, query } = req.query
    const states = await State.aggregate([
      {
        $sort: {
          createdAt: -1
        }
      },
      { $skip: parseInt(start) },
      { $limit: parseInt(limit) },

      {
        $lookup: {
          from: "countrys",
          localField: "country",
          foreignField: "_id",
          as: "country"
        }
      },
      {
        $match: {
          $or: [{ name: { $regex: query, $options: "i" } }]
        }
      },
      { $unwind: "$country" }
    ])
    const count = await State.countDocuments()
    res.status(200).json({ data: states, count })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const CreateState = async (req, res) => {
  try {
    const { name } = req.body.values
    if (!name) return res.status(400).json({ msg: "All fields are rquired." })
    const newCountry = new State({
      name
    })
    await newCountry.save()
    res.json("Saved")
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const UpdateState = async (req, res) => {
  try {
    const { values } = req.body
    await State.findOneAndUpdate(
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

const DeleteState = async (req, res) => {
  try {
    const { id } = req.params
    const country = await State.findById(id)
    if (country) {
      await country.remove()
    } else {
      return res.status(400).json("No State detected")
    }
    res.status(200).json("Deleted")
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = { GetStates, CreateState, UpdateState, DeleteState }
