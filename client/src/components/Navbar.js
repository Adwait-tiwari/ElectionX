import React from 'react';
import {ethers} from "ethers";
import  '../Styling/Navbar.css';

function Navbar({account,setAccount}) {

	const connectHandler = async (e) => {
		e.preventDefault();
	    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
	    const account = ethers.getAddress(accounts[0])
	    setAccount(account);
  	}

	return(
			<div className = "navbar">
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			      <a className="navbar-brand content" href="/">ElectionX</a>
			      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			        <span className="navbar-toggler-icon"></span>
			      </button>
			      <div className="collapse navbar-collapse" id="navbarNav">
			        <ul className="navbar-nav ml-auto">
			        </ul>
			      </div>
			       {account ? (
				        <button
				          type="button"
				          className='nav__connect'
				        >
				          {account.slice(0, 6) + '...' + account.slice(38, 42)}
				        </button>
				      ) : (
				        <button
				          type="button"
				          className='nav__connect'
				          onClick={connectHandler}
				        >
				          Connect
				        </button>
				    )}
			    </nav>
			</div>
	);
}

export default Navbar;