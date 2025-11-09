import { ObjectId } from "mongodb"

export const getAllIssues = async (req, res) => {
  try {
    const db = req.app.locals.db
    const issues = await db.collection("issues").find().sort({ date: -1 }).toArray()
    res.status(200).json(issues)
  } catch {
    res.status(500).json({ message: "Server error" })
  }
}

export const getLatestIssues = async (req, res) => {
  try {
    const db = req.app.locals.db
    const latestIssues = await db
      .collection("issues")
      .find()
      .sort({ date: -1 })
      .limit(6)
      .toArray()

    res.status(200).json(latestIssues)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}
export const getSingleIssue = async (req, res) => {
  try {
    const db = req.app.locals.db
    const issue = await db.collection("issues").findOne({ _id: new ObjectId(req.params.id) })
    if (!issue) return res.status(404).json({ message: "Issue not found" })
    res.status(200).json(issue)
  } catch {
    res.status(500).json({ message: "Server error" })
  }
}

export const createIssue = async (req, res) => {
  try {
    const db = req.app.locals.db
    const issue = { ...req.body, date: new Date(), status: "ongoing" }
    const result = await db.collection("issues").insertOne(issue)
    res.status(201).json(result)
  } catch {
    res.status(400).json({ message: "Failed to add issue" })
  }
}

export const updateIssue = async (req, res) => {
  try {
    const db = req.app.locals.db
    const result = await db.collection("issues").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    )
    res.status(200).json(result)
  } catch {
    res.status(400).json({ message: "Failed to update" })
  }
}

export const deleteIssue = async (req, res) => {
  try {
    const db = req.app.locals.db
    const result = await db.collection("issues").deleteOne({ _id: new ObjectId(req.params.id) })
    res.status(200).json(result)
  } catch {
    res.status(400).json({ message: "Failed to delete" })
  }
}
