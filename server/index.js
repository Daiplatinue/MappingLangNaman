import express from "express"
import cors from "cors"

import { registerUser, loginUser } from "./controller/authController.js"
import { postEmergency } from "./controller/emergencyController.js"
import { postRequest, getRequestsByRequester } from "./controller/userRequestController.js"
import { postReport, getReportsByRequester, getAllReports } from "./controller/reportController.js"
import { postPayment, getPaymentsByUserId, getAllPayments } from "./controller/paymentController.js"
import { postConstruction, getAllConstructions } from "./controller/constructionController.js"
import { postadminCreateUser, getAllUsers } from "./controller/adminCreateUserController.js"
import { postNotification, getAllNotifications } from "./controller/notificationController.js"

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

// Authentication Routes
app.post("/register", registerUser)
app.post("/login", loginUser)

// Household Owner Routes
app.post("/postEmergency", postEmergency)

app.post("/postRequest", postRequest)
app.get("/requests/:requesterId", getRequestsByRequester)

app.post("/postReport", postReport)
app.get("/reports/:requesterId", getReportsByRequester)

app.post("/postPayment", postPayment)
app.get("/payments/:userId", getPaymentsByUserId)

// Admin Routes
app.post("/postConstruction", postConstruction)
app.get("/constructions", getAllConstructions)
app.post("/postadminCreateUser", postadminCreateUser)
app.get("/users", getAllUsers)

// Add this route for admin to fetch all payments and reports
app.get("/payments", getAllPayments)
app.get("/reports", getAllReports)
app.post("/postNotification", postNotification)
app.get("/notifications", getAllNotifications)

app.get("/", (req, res) => {
  console.log("req.body")
})

app.listen(process.env.PORT, () => {
  console.log("Server is Running", process.env.PORT)
})