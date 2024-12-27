import React, { useState,useContext } from "react";
import Sidebar from './Sidebar.js';
import { VerificationContext } from "./VerificationContext";
import VotersData from '../abi/VotersData.json';

function VerificationForm() {

  const { setIsVerified,setVerifiedName } = useContext(VerificationContext);
  const [formData, setFormData] = useState({
    name: "",
    voterID: "",
    panID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVerify = (e) => {
    e.preventDefault();

    const { name, voterID, panID } = formData;

    const isMatch = VotersData.some(
        (voter)=>
          voter.name === name.trim() &&
          voter.voterID === voterID.trim() &&
          voter.panID === panID.trim()
    );

    if(isMatch){
      setIsVerified(true);
      setVerifiedName(name);
      alert("Verification Successfull");
    }else{
      setIsVerified(false);
      alert("Verification Unsuccessfull");
    }
    
  };

  return (
    <div className="form-container">
    <Sidebar/>
      <h2>Verification Form</h2>
      <form>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="voterID">Voter ID</label>
          <input
            type="text"
            id="voterID"
            name="voterID"
            value={formData.voterID}
            onChange={handleChange}
            placeholder="Enter your Voter ID"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="panID">PAN ID</label>
          <input
            type="text"
            id="panID"
            name="panID"
            value={formData.panID}
            onChange={handleChange}
            placeholder="Enter your PAN ID"
            required
          />
        </div>

        <button type="submit" className="submit-btn" onClick={handleVerify}>
          Verify
        </button>
      </form>
    </div>
  );
}

export default VerificationForm;
