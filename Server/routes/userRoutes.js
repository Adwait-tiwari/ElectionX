import express from "express";
import User from "../modals/User.js"; // adjust path if needed

const router = express.Router();

// GET /api/user/:address
router.get("/:emailId", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.params.emailId.toLowerCase() });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({
            name: user.name,
            location: user.location,
        });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;