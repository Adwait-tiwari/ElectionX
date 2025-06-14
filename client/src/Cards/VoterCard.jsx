import { useEffect, useState } from "react";
import axios from "axios";

function VoterCard({ index, voteCount, name, partyName, location, contract, id, userLocation }) {
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [isWithinVotingTime, setIsWithinVotingTime] = useState(false);
   const [email, setEmail] = useState(""); 

  // Check local time for voting window
  useEffect(() => {
    const checkVotingTime = () => {
      const now = new Date();
      const hour = now.getHours(); // local time hour (0 - 23)
      setIsWithinVotingTime(hour >= 8 && hour < 17); // 8 AM to before 5 PM
    };

    checkVotingTime();

    // Optional: Update time check every minute
    const interval = setInterval(checkVotingTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const acc = accounts[0];
      setAccount(acc);
      const votedStatus = localStorage.getItem(`voted-${acc}`);
      setHasVoted(votedStatus === "true");
    };
    fetchAccount();
  }, []);

  const handleClick = async (id) => {
    try {
      setLoading(true);
      const tx = await contract.castVote(id);
      await tx.wait();
      localStorage.setItem(`voted-${account}`, "true");
      setHasVoted(true);
       const userEmail = localStorage.getItem('userEmail');
        setEmail(userEmail);

        // Fetch the user's location from the backend using the wallet address
        const res = await fetch(`http://localhost:5000/api/user/${userEmail}`);
        const data = await res.json();
        const votername = data.name;
      await axios.post("http://localhost:5000/api/vote", {
        candidateId: id,
        candidateName: name,
        partyName: partyName,
        location: location,
        userAccount: account,
        userName: votername
      });
      alert("You Casted Vote Successfully");
    } catch (err) {
      console.error("Voting failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const isLocationMatch = userLocation === location;
  const canVote = isLocationMatch && isWithinVotingTime && !hasVoted;

  return (
    <div className="min-h-screen bg-gray-900 p-3" key={index}>
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">{name}</h2>
        <p className="text-gray-300 mb-4">Party Name : {partyName}</p>
        <p className="text-gray-300 mb-4">Location : {location}</p>
        <p className="text-gray-300 mb-4">Number of Votes : {voteCount}</p>

        {!isLocationMatch && (
          <p className="text-red-400 text-sm mb-4">
            You cannot vote for this candidate because their location does not match yours.
          </p>
        )}

        {!isWithinVotingTime && (
          <p className="text-yellow-400 text-sm mb-4">
            Voting is allowed only between 8:00 AM and 5:00 PM.
          </p>
        )}

        <button
          onClick={() => handleClick(id)}
          disabled={!canVote || loading}
          className={`${
            !canVote
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          {hasVoted ? "Voted" : loading ? "Voting..." : "Cast Vote"}
        </button>
      </div>
    </div>
  );
}

export default VoterCard;
