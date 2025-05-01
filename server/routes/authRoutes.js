import express from "express"
import { connectToDatabase } from "../lib/db.js"

const router = express.Router()

router.post("/login", async (req, res) => {
  const { refs } = req.body
  try {
    const db = await connectToDatabase()
    const [rows] = await db.query("SELECT * FROM users WHERE u_refs = ?", [refs])

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    const user = {
      id: rows[0].u_id,
      firstname: rows[0].u_fn,
      lastname: rows[0].u_ln,
      middlename: rows[0].u_mi,
      email: rows[0].u_email,
      refs: rows[0].u_refs,
      type: rows[0].u_type,
      block: rows[0].u_block,
      hid: rows[0].u_hid,
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
    const [rows] = await db.query("SELECT * FROM users WHERE u_id = ?", [req.session.userId])
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