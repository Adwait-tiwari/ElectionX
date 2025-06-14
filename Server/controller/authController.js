import User from '../modals/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';

export const signup = async (req, res) => {
    try {
        const { name, email, password, voterId, location } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already in use' });

        const user = new User({ name, email, password, voterId, location });
        await user.save();

        const token = generateToken(user);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

        const token = generateToken(user);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};