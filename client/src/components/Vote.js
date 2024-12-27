import {useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import DvoteAbi from '../abi/Dvote.json';

import Sidebar from './Sidebar.js';
import '../Styling/Home.css';


function Vote( { vote,setVote }){

	const[voteIndex,setVoteIndex] = useState(null);
  	const[voting,setVoting] = useState([ ]);
  	const [currentAccount, setCurrentAccount] = useState(null);
  	const [votedCandidateId, setVotedCandidateId] = useState(null);

	useEffect(()=>{

		const fetchData = async()=>{

			if(vote){

				const voteIndex = await vote.voteIndex();
    			setVoteIndex(voteIndex);

				const votingData = [];

			    for (var i =  1; i <= voteIndex; i++) {
			      const tx = await vote.getVote(i);
			      const [voteCount, name, partyName] = tx;
			      votingData.push({
		            voteCount: voteCount, // Convert BigInt to string
		            name: name || "Unknown",
		            partyName: partyName || "Unknown",
		            id : i,
		          });
			    }
			    setVoting(votingData);
			}
		}

		fetchData();

		 const storedVotedId = localStorage.getItem("votedCandidateId");
		  if (storedVotedId) {
		    setVotedCandidateId(parseInt(storedVotedId));
		  }

		const {ethereum } = window;
		if (ethereum) {
	      ethereum.on('accountsChanged', (accounts) => {
	        if (accounts.length > 0) {
	          setCurrentAccount(accounts[0]);
	          setVotedCandidateId(null); // Reset voted state
	         localStorage.removeItem("votedCandidateId");
	        } else {
	          setCurrentAccount(null);
	        }
	      }); 
	     }

	},[vote]);

	const handleClick = async(id)=>{
		const tx = await vote.castVote(id);
		setVotedCandidateId(id);
		await tx.wait();

		
    	localStorage.setItem("votedCandidateId", id);

		const updatedVoteData = await vote.getVote(id);
	    setVoting((prevVoting) =>
	      prevVoting.map((candidate) =>
	        candidate.id === id
	          ? { ...candidate, voteCount: updatedVoteData[0] } // Update vote count
	          : candidate
	      )
	    );
	}

	return(
		<div>
			<Sidebar/>
			<div className = "home">
				{voting.length=== 0 ? (
					  <p style={{ fontStyle: "italic", color: "gray" }}>No candidates for votes available.</p>
					) : (
					voting.map((voted,index)=>(
						<div className="card" style = {{display : "flex" , gap : "10px"}} key = {index}>
					      <div className="card-content">
					        <h2 className="card-title">Number of Vote: {voted.voteCount?.toString()}</h2>
					        <p className="card-description">Name : {voted.name}</p>
					        <div className="card-details">
					          <p className="card-date">Party Name : {voted.partyName}</p>
					        </div>
					        <button type="button" className="btn btn-info button" onClick = {()=>handleClick(voted.id)} disabled={votedCandidateId !== null}> 
					        {votedCandidateId === voted.id
			                    ? "Voted"
			                    : votedCandidateId !== null
			                    ? "Voted"
			                    : "Vote"}
			                </button>
					      	
					      </div>
					    </div>
					))
				)}
			</div>
		</div>
	);
}

export default Vote;