import express from "express"
import { connectToDatabase } from "../lib/db.js"

const router = express.Router()

router.post("/construction", async (req, res) => {
  const { block, hid, status, startDate, endDate } = req.body
  try {
    const db = await connectToDatabase()
    
    await db.query(
      "INSERT INTO construction (c_block, c_hid, c_status, c_startDate, c_endDate) VALUES (?, ?, ?, ?, ?)",
      [block, hid, status, startDate, endDate],
    )

    return res.status(201).json({ message: "construction created successfully" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Server error", error: err.message })
  }
})

export default router