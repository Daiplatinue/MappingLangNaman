import express from "express"
import { connectToDatabase } from "../lib/db.js"

const router = express.Router()

router.post("/construction", async (req, res) => {
  const { firstname, lastname, email, password } = req.body
  try {
    const db = await connectToDatabase()
    
    await db.query(
      "INSERT INTO accounts (u_fn, u_ln, u_email, u_password, u_type, u_status) VALUES (?, ?, ?, ?, 'customer', 'pending')",
      [firstname, lastname, email, hashPassword],
    )

    return res.status(201).json({ message: "user created successfully" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Server error", error: err.message })
  }
})

export default router