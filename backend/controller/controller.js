import User from '../models/user.js'; 

export const create = async (req,res) => {
    try{
        const userData = new User(req.body);
        const {email} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists."})
        }
        const savedData = await userData.save();
        res.status(200).json(savedData);
    }
    catch(err){
        res.status(500).json({ error: "Internal Server Error!"});
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(users.length === 0){
            return res.status(404).json({ message: "User not found!" })
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error! "});
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExists = await User.findOne({_id: id});
        if(!userExists){
            return res.status(404).json({ message: "User not found!" });
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(201).json(updateUser);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error! "});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExists = await User.findOne({ _id: id});
        if(!userExists){
            return res.status(404).json({ message: "User not found! "});
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({ message: "User deleted successfully!" })
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error!"});
    }
}