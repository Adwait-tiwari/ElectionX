import React from 'react';
import {ethers} from "ethers";
import { useNavigate } from "react-router-dom";

import '../Styling/Main.css';


function Main(){
	const navigate = useNavigate()

	const handleClick = async()=>{
		navigate("/home");
	}

	return(
		<div className = "main">
			<div className = "content">
				<h1>The Union Must and Shall Be Preserved!</h1>
				<p>Your voice matters, and your vote is your power. Make a difference by choosing the leaders who will shape our future. Every vote counts, and yours can be the one that sparks change. Go out, cast your vote, and let your voice be heard!</p>
				<button type="button" class="btn btn-outline-info" onClick = {handleClick}>Get Started</button>
			</div>
		</div>
	);
}

export default Main;