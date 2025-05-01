import express from "express"
import { connectToDatabase } from "../lib/db.js"

const router = express.Router()

router.post("/updateIncidentStatus", async (req, res) => {
  const { id, status } = req.body

  if (!id || !status) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  try {
    const db = await connectToDatabase()

    await db.query("UPDATE incident SET i_status = ? WHERE i_id = ?", [status, id])

    return res.status(200).json({
      success: true,
      message: "Incident status updated successfully",
    })
  } catch (err) {
    console.error("Error updating incident status:", err)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    })
  }
})

export default router