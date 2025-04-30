import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import addUser from './routes/addUser.js'

const app = express()
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}))
app.use(express.json())

app.use('/auth', authRouter) 
app.use('/post', addUser) 

app.get('/', (req, res) => {
    console.log("req.body")
})

app.listen(process.env.PORT, () => {
    console.log("Server is Running", process.env.PORT)
})