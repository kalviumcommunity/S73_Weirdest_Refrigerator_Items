import db from "../config/db.js";

export const addUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const [result] = await db.execute(
      "INSERT INTO users (username) VALUES (?)",
      [username]
    );

    const newUser = {
      id: result.insertId,
      username,
    };

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Add user error:", err);
    res.status(500).json({ error: "Failed to add user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.execute("SELECT * FROM users");
    res.status(200).json(users);
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
