import React, { useState } from 'react';


function RegistrationForm({contract}) {
  const [name, setName] = useState('');
  const [partyName, setPartyName] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!partyName.trim()) {
      newErrors.partyName = 'Party Name is required';
      isValid = false;
    }

    if (!location.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    }

    if (!age.trim()) {
      newErrors.age = 'Age is required';
      isValid = false;
    } else if (isNaN(age) || parseInt(age) <= 0) {
      newErrors.age = 'Age must be a valid number';
      isValid = false;
    }

    if (description.length > 200) {
      newErrors.description = 'Description cannot exceed 200 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
      if (validateForm()) {
        if (typeof window.ethereum !== 'undefined') {
          try {
            const tx = await contract.RegisterPerson(name, parseInt(age), partyName, location);
            await tx.wait(); // Wait for the transaction to be mined

            setRegistrationSuccess(true);
  
            // Reset form after successful registration
            setName('');
            setPartyName('');
            setLocation('');
            setAge('');
            setErrors({});
            setTimeout(() => setRegistrationSuccess(false), 3000); // Show success for 3 seconds
          } catch (error) {
            console.error('Error registering person:', error);
            alert('Error during registration');
          }
        } else {
          alert('MetaMask is not connected!');
        }
      } // Show success message for 3 seconds
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 flex justify-center items-center text-white">
      <div className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="block text-indigo-400 text-2xl font-bold mb-6 text-center">Candidate Registration</h2>
        {registrationSuccess && (
          <div className="bg-green-800 border-green-600 text-green-300 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">Registration successful.</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 ${errors.name ? 'border-red-500' : ''}`}
              id="name"
              type="text"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>

          {/* Party Name */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="partyName">
              Party Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 ${errors.partyName ? 'border-red-500' : ''}`}
              id="partyName"
              type="text"
              placeholder="Name of the Political Party"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
            />
            {errors.partyName && <p className="text-red-500 text-xs italic">{errors.partyName}</p>}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 ${errors.location ? 'border-red-500' : ''}`}
              id="location"
              type="text"
              placeholder="Your Constituency/Region"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {errors.location && <p className="text-red-500 text-xs italic">{errors.location}</p>}
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="age">
              Age
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 ${errors.age ? 'border-red-500' : ''}`}
              id="age"
              type="number"
              placeholder="Your Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && <p className="text-red-500 text-xs italic">{errors.age}</p>}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 ${errors.description ? 'border-red-500' : ''}`}
              id="description"
              placeholder="A brief description about yourself (max 200 characters)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;