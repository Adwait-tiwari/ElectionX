import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
    candidateId: Number,
    candidateName: String,
    partyName: String,
    location: String,
    votedBy: String,
    votedAt: { type: Date, default: Date.now },
    name: String
});

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;