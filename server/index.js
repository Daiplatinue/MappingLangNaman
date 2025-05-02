import express from "express"
import cors from "cors"
import authRouter from "./routes/authRoutes.js"
import addUser from "./routes/addUser.js"
import incident from "./routes/incident.js"
import construction from "./routes/construction.js"
import getGuardsRouter from "./routes/getGuards.js"
import getUsersRouter from "./routes/getUsers.js"
import updateUserHouseholdRouter from "./routes/updateUserHousehold.js"
import getIncidentRouter from "./routes/getIncident.js"
import updateIncidentStatusRouter from "./routes/updateIncidentStatus.js"
import getConstructionRouter from "./routes/getConstruction.js"

const app = express()
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  }),
)
app.use(express.json())

app.use("/auth", authRouter)
app.use("/post", addUser)
app.use("/post", incident)
app.use("/post", construction)
app.use("/get", getGuardsRouter)
app.use("/get", getUsersRouter)
app.use("/post", updateUserHouseholdRouter)
app.use("/get", getIncidentRouter)
app.use("/post", updateIncidentStatusRouter)
app.use("/get", getConstructionRouter)

app.get("/", (req, res) => {
  console.log("req.body")
})

app.listen(process.env.PORT, () => {
  console.log("Server is Running", process.env.PORT)
})