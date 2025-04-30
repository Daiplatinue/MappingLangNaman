import express from "express"
import { connectToDatabase } from "../lib/db.js"

const router = express.Router()

router.post("/security", async (req, res) => {
  const { firstname, lastname, email, password } = req.body
  try {
    const db = await connectToDatabase()
    const [rows] = await db.query("SELECT * FROM accounts WHERE u_email = ?", [email])
    if (rows.length > 0) {
      return res.status(409).json({ message: "Email already exists" })
    }
    const hashPassword = await bcrypt.hash(password, 10)

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