import express from "express"
import { connectToDatabase } from "../lib/db.js"

const router = express.Router()

router.post("/updateIncidentStatus", async (req, res) => {
  try {
    const { incidentId } = req.body

    if (!incidentId) {
      return res.status(400).json({
        success: false,
        message: "Incident ID is required"
      })
    }

    const db = await connectToDatabase()
    
    await db.query(
      "UPDATE incident SET i_status = 'Resolved' WHERE i_id = ?",
      [incidentId]
    )
    
    return res.status(200).json({
      success: true,
      message: "Incident status updated successfully"
    })
  } catch (err) {
    console.error("Database error:", err)
    
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    })
  }
})

export default router