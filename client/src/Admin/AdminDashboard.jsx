import React, { useEffect, useState } from "react";
import NavBar from "../Header/Navbar";
import Card from "../Cards/Card";
import PopupDialog from "../PopupDialog/PopupDialog";
import { useNavigate } from 'react-router-dom'; 

function AdminDashboard({ PersonIndex, contract }) {
  const [people, setPeople] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate(); 

  const fetchPeople = async () => {
    try {
      const temp = [];
      for (let i = 1; i <= PersonIndex; i++) {
        const [name, age, partyName, location] = await contract.getPerson(i);
        temp.push({ name, age, partyName, location });
      }
      setPeople(temp);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEndElection = async() =>{
    try {
      const winningCandidate = await contract.Result();
      setResult(winningCandidate);
      setShowPopup(true);

      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("voted-") || key === 'token') {
          localStorage.removeItem(key);
        }
      });
    } catch (err) {
      console.log("Error fetching result:", err);
    }
  }

  useEffect(() => {
    if (contract && PersonIndex !== null && PersonIndex !== undefined) {
      fetchPeople();
    }
  }, [contract, PersonIndex]);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <NavBar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Admin Dashboard
        </h1>

        <div className="flex justify-end mb-7">
          <button
            onClick={handleEndElection}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            End Election
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {people.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 italic">
              No candidates available.
            </div>
          ) : (
            people.map((person, index) => (
              <Card
                key={index}
                title={person.name}
                age={person.age}
                partyName={person.partyName}
                location={person.location}
                contract={contract}
              />
            ))
          )}
        </div>
      </div>

      <PopupDialog open={showPopup} onClose={() => {setShowPopup(false); navigate("/");}}  result = {result}/>
    </div>
  );
}

export default AdminDashboard;
