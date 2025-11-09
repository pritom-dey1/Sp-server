import admin from "./firebaseAdmin.js"

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decodedValue = await admin.auth().verifyIdToken(token)
    req.user = decodedValue
    next()
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" })
  }
}
