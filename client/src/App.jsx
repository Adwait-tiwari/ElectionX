import React , {useEffect, useState} from "react";
import { ethers } from 'ethers';
import { ContractAddress,ContractABI} from './abi/config.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import RegistrationForm from "./Forms/RegisterPerson";
import SignupForm from "./Forms/Signup";
import LoginForm from "./Forms/Login";
import Dashboard from "./LandingPage/Dashboard";
import AdminDashboard from "./Admin/AdminDashboard";

function App() {
  const [contract,setContract] = useState(null);
  const[PersonIndex,setPersonIndex] = useState(null);
  const[voteIndex,setVoteIndex] = useState(null);

  const loadBlockchainData = async()=>{
      try{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const Dvote = new ethers.Contract(ContractAddress, ContractABI, signer);
        setContract(Dvote)
        const PersonIndex = await Dvote.personIndex();
        setPersonIndex(Number(PersonIndex));

        if (PersonIndex.toString() === "0") {
            console.log("No persons registered yet.");
            setPersonIndex([]);
            return;
        }

        const voteIndex = await Dvote.voteIndex();
        setVoteIndex(voteIndex);
      }catch(err){
        console.log(err);
      }
  }

  useEffect(() => {
    loadBlockchainData();
  }, [])
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard voteIndex = {voteIndex} contract = {contract}/>} />
        <Route path="/register" element={<RegistrationForm contract = {contract}/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/admin" element={<AdminDashboard PersonIndex = {PersonIndex} contract = {contract}/>} />
      </Routes>
    </Router>
  );
}

export default App;
