import { ObjectId } from "mongodb"

export const addContribution = async (req, res) => {
  try {
    const db = req.app.locals.db
    const contribution = { ...req.body, date: new Date() }
    const result = await db.collection("contributions").insertOne(contribution)
    res.status(201).json(result)
  } catch {
    res.status(400).json({ message: "Failed to add contribution" })
  }
}

export const getContributionsByIssue = async (req, res) => {
  try {
    const db = req.app.locals.db
    const data = await db.collection("contributions").find({ issueId: req.params.issueId }).toArray()
    res.status(200).json(data)
  } catch {
    res.status(500).json({ message: "Server error" })
  }
}

export const getContributionsByUser = async (req, res) => {
  try {
    const db = req.app.locals.db
    const data = await db.collection("contributions").find({ email: req.params.email }).toArray()
    res.status(200).json(data)
  } catch {
    res.status(500).json({ message: "Server error" })
  }
}
