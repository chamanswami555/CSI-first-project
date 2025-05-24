const bcrypt = require("bcryptjs");
const { db } = require("../config/firebase");
const { verifyRefreshToken, generateTokens } = require("../utils/token");
// Add this at the top of controller.js
const { admin } = require("../config/firebase");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body)
    const usersRef = db.collection("users");
    const existing = await usersRef.where("email", "==", email).get();
    if (!existing.empty) return res.status(400).json({ message: "Email already in use" });

    const hash = await bcrypt.hash(password, 10);
    const userRef = await usersRef.add({ name, email, password: hash });

    const tokens = generateTokens(userRef.id);
    res.status(200).json({ user: { id: userRef.id, name, email }, tokens });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();

    if (snapshot.empty) return res.status(401).json({ message: "Invalid credentials" });

    const doc = snapshot.docs[0];
    const user = doc.data();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const tokens = generateTokens(doc.id);
    res.status(200).json({ user: { id: doc.id, name: user.name, email }, tokens });
};

exports.me = async (req, res) => {
    const doc = await db.collection("users").doc(req.userId).get();
    if (!doc.exists) return res.status(404).json({ message: "User not found" });
    const user = doc.data();
    res.status(200).json({ id: doc.id, name: user.name, email: user.email });
};



exports.refresh = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const userId = decoded.sub;

    // Optionally check if user exists in DB here

    const tokens = generateTokens(userId);

    return res.status(200).json({
      message: "Token refreshed successfully",
      tokens,
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};



exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    console.log(req.body);
    

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    // OPTIONAL: Invalidate token by adding it to a blacklist collection
    await db.collection("tokenBlacklist").add({
      token: refreshToken,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // On frontend, also remove both access & refresh tokens from localStorage or cookies
    return res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error during logout" });
  }
};