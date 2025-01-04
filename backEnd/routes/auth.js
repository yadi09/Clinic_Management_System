import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const UserInDb = await User.findOne({ email: req.body.email });
        if (!UserInDb) return res.status(400).send({ message: 'User Not Found' });

        const validPassword = await bcrypt.compare(req.body.password, UserInDb.password);
        if (!validPassword) return res.status(400).send({ message: 'Invalid email or password' });

        const token = UserInDb.generateAuthToken();
        console.log("Inside Auth Route", token);
        
        res.status(200).send({data: token, message: 'User logged in successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;