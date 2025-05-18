import { adminCreateUser } from "../models/adminCreateUser.js"

const postadminCreateUser = async (req, res) => {
  try {
    const { firstname, lastname, middlename, email, contact, type, block, houseId, status = "Active" } = req.body

    if (!firstname || !lastname || !email || !contact || !type) {
      return res.status(400).json({ message: "Please fill all required fields" })
    }

    if (type !== "guard" && (!block || !houseId)) {
      return res.status(400).json({ message: "Block and House ID are required for residents" })
    }

    const userData = {
      firstname,
      lastname,
      middlename,
      email,
      contact,
      type,
      status,
    }

    if (type !== "guard") {
      userData.block = block
      userData.houseId = houseId
    }

    const newadminCreateUser = await adminCreateUser.create(userData)

    return res.status(201).json(newadminCreateUser)
  } catch (error) {
    console.error("adminCreateUser creation error:", error)
    return res.status(500).json({ message: "Server error while processing adminCreateUser request" })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await adminCreateUser.find({})
    return res.status(200).json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return res.status(500).json({ message: "Server error while fetching users" })
  }
}

export { postadminCreateUser, getAllUsers }