import { User, validateUser } from '../models/user.js';
import bcrypt from 'bcrypt';
import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const UserInDb = await User.findOne({ email: req.body.email});
        if (UserInDb) return res.status(400).send({ message: 'User already registered' });
        
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT, 10));
        const hasshedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hasshedPassword,
            role: req.body.role
        })

        await user.save();
        res.status(201).send({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;