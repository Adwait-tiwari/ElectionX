import {ethers} from "ethers";
import {useState,useEffect,useContext} from "react";

import Sidebar from './Sidebar.js';
import { VerificationContext } from "./VerificationContext";

import DvoteAbi from '../abi/Dvote.json';
import '../Styling/Register.css';


function Register({ vote,setVote }){
	const { isVerified,verifiedName } = useContext(VerificationContext);
	const [formData,setFormData] = useState({
			name :  "",
			age : "",
			party :"",
			dob : "",
	})

	const partyOptions = ["Bhartiya Janta Party","Aam Aadmi Party","Congress","Bhaujan Samaj Party"];

	const handleChange = async(e)=>{
		const {name,value} = e.target;
		setFormData({...formData,[name] : value});
	}

	const handleSubmit = async(e)=>{
		e.preventDefault();
		const {name,age,party} = formData;

		if (!isVerified) {
	      alert("You must complete verification first.");
	      return;
	    }

         if(name.trim().toLowerCase() !== verifiedName.trim().toLowerCase()){
	    	alert("Person trying to register himself has not been verified Please Verify it....");
	    }else{

	    	try{
	        	if (!vote) {
	                alert("Contract not initialized. Please check your connection.");
	                return;
	            }
				const tx = await vote.RegisterPerson(name,parseInt(age,10),party)
				await tx.wait();

				alert("Registration Successfull");
			}catch (err) {
	            console.error("Transaction failed:", err);
	            alert(`Error: ${err.message}`);
	        }

	    }
	}


	return(
		<div class="form-container register">
			<Sidebar/>
		    <h2>Registration Form</h2>
		    <form>
		      <div class="form-group">
		        <label for="name">Name</label>
		        <input type="text" id="name" name="name" value = {formData.name} onChange ={handleChange} placeholder="Enter your full name" />
		      </div>
		      <div class="form-group">
		        <label for="age">Age</label>
		        <input type="number" id="age" name="age"  value = {formData.age} onChange ={handleChange} placeholder="Enter your age" min="18" />
		      </div>
		       <div className="form-group">
		          <label htmlFor="party">Party Name</label>
		          <select
		            id="party"
		            name="party"
		            value={formData.party}
		            onChange={handleChange}
		            required
		          >
		            <option value="">Select a party</option>
		            {partyOptions.map((party, index) => (
		              <option key={index} value={party}>
		                {party}
		              </option>
		            ))}
		          </select>
        		</div>
		      <div class="form-group">
		        <label for="dob">Date of Birth</label>
		        <input type="date" id="dob" name="dob"  value = {formData.dob} onChange ={handleChange}  />
		      </div>
		      <button type="submit" class="submit-btn" onClick = {handleSubmit}>Submit</button>
		    </form>
  		</div>
	);
}

export default Register;