import mongoose from "mongoose"

const EmergencySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Emergency = mongoose.model("Emergency", EmergencySchema)

export { Emergency }