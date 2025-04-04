import userSchema from '../models/userSchema.js';

export const addUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = new userSchema({ username });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to add user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userSchema.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
