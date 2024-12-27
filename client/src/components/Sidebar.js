import React from 'react';
import { Link} from "react-router-dom";

import '../Styling/Sidebar.css';


function Sidebar(){
	return(
		<div className = "sidebar">
			<Link to="/">Home</Link>
		    <Link to="#">About</Link>
		    <Link to="/Register">Register</Link>
		    <Link to="/vote">Vote</Link>
		    <Link to="/home">Person Registered</Link>
		    <Link to="/verify">Verify Yourself</Link>
		</div>
	);
}

export default Sidebar;