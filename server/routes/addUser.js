import express from "express"
import { connectToDatabase } from "../lib/db.js"

const router = express.Router()

router.post("/addUser", async (req, res) => {
  const { firstname, lastname, middlename, email, refs, type, block, hid , status} = req.body

  console.log("Received user data:", req.body)

  if (!firstname || !lastname || !email || !type) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  try {
    const db = await connectToDatabase()

    const [existingUsers] = await db.query("SELECT * FROM users WHERE u_email = ?", [email])

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Email already exists" })
    }

    const [result] = await db.query(
      "INSERT INTO users (u_fn, u_ln, u_mi, u_email, u_refs, u_type, u_block, u_hid, u_status) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, 'New')",
      [firstname, lastname, middlename, email, refs, type, block, hid, status],
    )

    console.log("Database insert result:", result)

    return res.status(201).json({
      message: "User created successfully",
      userId: result.insertId,
    })
  } catch (err) {
    console.error("Database error:", err)

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email already exists" })
    }

    return res.status(500).json({
      message: "Server error",
      error: err.message,
      code: err.code,
    })
  }
})

export default router