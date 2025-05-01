import express from "express"
import { connectToDatabase } from "../lib/db.js"

const router = express.Router()

router.post("/displayGuard", async (req, res) => {
  try {
    const db = await connectToDatabase()

    const result = await db.query("SELECT * FROM users WHERE u_type = 'guard'")

    const guards = (result.rows || result).map((guard) => ({
      id: guard.u_id,
      firstname: guard.u_fn,
      lastname: guard.u_ln,
      middlename: guard.u_mi,
      email: guard.u_email,
      referralCode: guard.u_refs,
      type: guard.u_type,
      block: guard.u_block,
      householdId: guard.u_hid,
      status: guard.u_status,
    }))

    return res.status(200).json({
      success: true,
      guards: guards,
    })
  } catch (err) {
    console.error("Database error:", err)

    return res.status(500).json({
      message: "Server error",
      error: err.message,
      code: err.code,
    })
  }
})

export default router