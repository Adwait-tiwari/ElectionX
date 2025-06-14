import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from "./routes/userRoutes.js";
import voteRoutes from "./routes/votes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());

mongoose.connect(process.env.Mongo_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));

app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", voteRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});