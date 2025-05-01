import express from "express"
import { connectToDatabase } from "../lib/db.js"

const router = express.Router()

router.get("/guards", async (req, res) => {
  try {
    const db = await connectToDatabase()
    
    const [guards] = await db.query("SELECT * FROM users WHERE u_type = 'guard'")
    
    return res.status(200).json({
      success: true,
      guards: guards
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