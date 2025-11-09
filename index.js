import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import issueRoutes from "./routes/issueRoutes.js"
import contributionRoutes from "./routes/contributionRoutes.js"
import statsRoutes from "./routes/statsRoutes.js"
dotenv.config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const db = await connectDB()
app.locals.db = db

app.get("/", (req, res) => res.send("Community Cleanliness API Running"))
app.use("/api/issues", issueRoutes)
app.use("/api/stats", statsRoutes)

app.use("/api/contributions", contributionRoutes)

app.listen(port, () => console.log(`Server running on port ${port}`))
