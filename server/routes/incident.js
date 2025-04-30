import express from "express"
import { connectToDatabase } from "../lib/db.js"

const router = express.Router()

router.post("/incident", async (req, res) => {
  const { date, type, description, status } = req.body
  try {
    const db = await connectToDatabase()
    await db.query(
      "INSERT INTO incident_tb (date, type, description, status) VALUES (?,?, ?, ?)",
      [date, type, description, status],
    )
    return res.status(201).json({ message: "incident created successfully" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Server error", error: err.message })
  }
})

export default router