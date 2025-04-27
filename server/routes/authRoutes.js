import express from "express"
import { connectToDatabase } from "../lib/db.js"
import bcrypt from "bcrypt"

const router = express.Router()

router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const db = await connectToDatabase()
    const [rows] = await db.query("SELECT * FROM accounts WHERE u_email = ?", [email])
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }
    const isMatch = await bcrypt.compare(password, rows[0].u_password)
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" })
    }

    const user = {
      id: rows[0].u_id,
      firstname: rows[0].u_fn,
      lastname: rows[0].u_ln,
      email: rows[0].u_email,
      type: rows[0].u_type,
      status: rows[0].u_status,
    }

    return res.status(200).json({
      message: "Login successful",
      user: user,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Server error", error: err.message })
  }
})

const checkAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    next()
  } else {
    return res.status(401).json({ message: "Unauthorized" })
  }
}

router.get("/home", checkAuth, async (req, res) => {
  try {
    const db = await connectToDatabase()
    const [rows] = await db.query("SELECT * FROM accounts WHERE u_id = ?", [req.session.userId])
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json({ user: rows[0] })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Server error", error: err.message })
  }
})

export default router