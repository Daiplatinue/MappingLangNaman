import express from "express"
import { connectToDatabase } from "../lib/db.js"

const router = express.Router()

router.post("/incident", async (req, res) => {
  const { block, hid, type, description, date } = req.body
  try {
    const db = await connectToDatabase()
    await db.query(
      "INSERT INTO incident (i_block, i_hid, i_type , i_description, i_status, i_date) VALUES (?, ?, ?, ?, 'In Progress',?)",
      [block, hid, type, description, date],
    )
    return res.status(201).json({ message: "incident created successfully" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Server error", error: err.message })
  }
})

export default router