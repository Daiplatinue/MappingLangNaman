import express from "express"
import cors from "cors"

import { registerUser, loginUser } from "./controller/authController.js"
import { postEmergency } from "./controller/emergencyController.js"
import { postRequest, getRequestsByRequester } from "./controller/userRequestController.js"
import { postReport, getReportsByRequester } from "./controller/reportController.js"
import { postPayment, getPaymentsByUserId } from "./controller/paymentController.js"

import mongoose from "mongoose"

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Failed", err))

const app = express()
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  }),
)
app.use(express.json())

app.post("/register", registerUser)
app.post("/login", loginUser)

app.post("/postEmergency", postEmergency)

app.post("/postRequest", postRequest)
app.get("/requests/:requesterId", getRequestsByRequester)

app.post("/postReport", postReport)
app.get("/reports/:requesterId", getReportsByRequester)

app.post("/postPayment", postPayment)
app.get("/payments/:userId", getPaymentsByUserId)

app.get("/", (req, res) => {
  console.log("req.body")
})

app.listen(process.env.PORT, () => {
  console.log("Server is Running", process.env.PORT)
})