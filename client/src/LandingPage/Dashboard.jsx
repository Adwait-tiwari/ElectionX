import React, { useEffect, useState } from 'react';
import NavBar from "../Header/Navbar";
import VoterCard from "../Cards/VoterCard";

function Dashboard({ voteIndex, contract }) {
  const [votingData, setVotingData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [email, setEmail] = useState(""); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        setEmail(userEmail);

        // Fetch the user's location from the backend using the wallet address
        const res = await fetch(`http://localhost:5000/api/user/${userEmail}`);
        const data = await res.json();

        if (res.ok) {
          setUserLocation(data.location);
        } else {
          console.error("User location fetch failed:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const voterDetails = async () => {
      try {
        const results = [];
        for (let i = 1; i <= voteIndex; i++) {
          const tx = await contract.getVote(i);
          const [voteCount, name, partyName, location] = tx;
          results.push({
            voteCount: voteCount.toString(), // Convert BigInt to string for display
            name: name || "Unknown",
            partyName: partyName || "Unknown",
            location: location || "Unknown",
            id: i,
          });
        }
        setVotingData(results);
      } catch (err) {
        console.error("Error fetching voting data:", err);
      }
    };
    fetchUserData();
    if (contract && userLocation !== null) {
      voterDetails();
    }
  }, [userLocation,voteIndex, contract]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Cast Your Vote
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {votingData.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 italic">
              No candidates available.
            </div>
          ) : (
            votingData.map((person, index) => (
              <VoterCard
                key={index}
                voteCount={person.voteCount}
                name={person.name}
                partyName={person.partyName}
                location={person.location}
                contract={contract}
                userLocation = {userLocation}
                id={person.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
