import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import DvoteAbi from '../abi/Dvote.json';

import Sidebar from './Sidebar.js';
import '../Styling/Home.css';


function Home( { persons,Personindex,vote,setVote }){
	const[startVote,setStartVote] = useState(null);

	const handleClick = async(name,partyName)=>{
		const startVote = await vote.startVote(name,partyName);
		await startVote.wait();
		setStartVote(startVote);
		alert(`Vote for ${name} has started successfully`);
	}

	return(
		<div>
			<Sidebar/>
			<div className = "home">
				{persons.length=== 0 ? (
					  <p style={{ fontStyle: "italic", color: "gray" }}>No candidates available.</p>
					) : (
					persons.map((person,index)=>(
						<div className="card" style = {{display : "flex" , gap : "10px"}} key = {index}>
					      <div className="card-content">
					        <h2 className="card-title">Name : {person.name}</h2>
					        <p className="card-description">Party Name : {person.partyName}</p>
					        <div className="card-details">
					          <p className="card-date">{person.name} is a visionary leader, skilled developer, and advocate for technological progress and transparency.</p>
					        </div>
					        <button type="button" className="btn btn-info button" onClick = {()=>handleClick(person.name,person.partyName)}>Start Voting</button>
					      </div>
					    </div>
					))
				)}
			</div>
		</div>
	);
}

export default Home;