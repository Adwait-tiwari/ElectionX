import express from "express";
import mongoose from "mongoose";
import Vote from "../modals/Vote.js"; // Update path if needed

const router = express.Router();

router.post("/vote", async(req, res) => {
    const { candidateId, candidateName, partyName, location, userAccount, name } = req.body;

    try {
        const newVote = new Vote({
            candidateId,
            candidateName,
            partyName,
            location,
            votedBy: userAccount,
            name: name
        });

        await newVote.save();
        res.status(200).json({ message: "Vote recorded in DB" });
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err.message });
    }
});

export default router;