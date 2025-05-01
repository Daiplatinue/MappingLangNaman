import express from "express"
import { connectToDatabase } from "../lib/db.js"

const router = express.Router()

router.get("/users", async (req, res) => {
  try {
    const db = await connectToDatabase()
    
    const [users] = await db.query("SELECT * FROM users")
    
    return res.status(200).json({
      success: true,
      users: users
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