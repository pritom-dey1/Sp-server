import express from "express"
import { addContribution, getContributionsByIssue, getContributionsByUser } from "../controllers/contributionController.js"
import { verifyToken } from "../middleware/verifyToken.js"
const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const db = req.app.locals.db
    const data = await db.collection("contributions").find().toArray()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/",verifyToken, addContribution)
router.get("/issue/:issueId",verifyToken, getContributionsByIssue)
router.get("/user/:email",verifyToken, getContributionsByUser)

export default router
