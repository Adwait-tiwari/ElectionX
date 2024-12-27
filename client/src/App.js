import { useState,useEffect } from 'react';
import { ethers } from "ethers";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Navbar from '../src/components/Navbar.js';
import Main from '../src/components/Main.js';
import Home from '../src/components/Home.js';
import Register from '../src/components/Register.js';
import Vote from '../src/components/Vote.js';
import Verify from '../src/components/VerificationForm.js';
import { VerificationProvider } from "./components/VerificationContext";

import DvoteAbi from '../src/abi/Dvote.json';

import './App.css';

function App() {

  const [provider,setProvider] = useState(null);
  const[account,setAccount] = useState(null);
  const[vote,setVote] = useState(null);
  const [Personindex,setIndex] = useState(null);
  const [persons,setPerson] = useState([ ]);
 

  const loadBlockchainData = async()=>{

    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);

    const signer = await provider.getSigner()
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

    const network = await provider.getNetwork();
    const vote = new ethers.Contract(contractAddress,DvoteAbi,signer);
    setVote(vote);

    const Personindex = await vote.personIndex();
    setIndex(Personindex);
    
    if (Personindex.toString() === "0") {
        console.log("No persons registered yet.");
        setPerson([]);
        return;
    }

    const persons = [];

    for (var i = 1; i <= Personindex; i++) {
      const person = await vote.getPerson(i);
      persons.push(person);
    }

    setPerson(persons);


    window.ethereum.on("accountsChanged", async () => {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(ethers.getAddress(accounts[0]));
      });
  }

  useEffect(() => {
    loadBlockchainData()
  }, []);

  return (
    <VerificationProvider>
      <Router>
        <Navbar account = {account} setAccount = {setAccount}/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={ <Home persons = {persons} Personindex = {Personindex} vote = {vote} setVote = {setVote}/>  } />
           <Route path="/Register" element={<Register vote = {vote} setVote = {setVote} />} />
            <Route path="/verify" element={<Verify/>} />
            <Route path="/vote" element={<Vote  vote = {vote} setVote = {setVote} />} />
        </Routes>
      </Router>
     </VerificationProvider>
  );
}

export default App;
