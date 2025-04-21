import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  res.cookie("username", username, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Login successful" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
