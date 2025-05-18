import mongoose from "mongoose"

const adminCreateUserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: function () {
      return this.type !== "guard" 
    },
  },
  houseId: {
    type: String,
    required: function () {
      return this.type !== "guard" 
    },
  },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "Inactive", "Suspended", "Pending"],
  },
})

const adminCreateUser = mongoose.model("adminCreateUser", adminCreateUserSchema)

export { adminCreateUser }