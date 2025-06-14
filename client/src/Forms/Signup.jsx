import React, { useState } from 'react';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [voterId, setVoterId] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (!voterId.trim()) {
      newErrors.voterId = 'Voter ID is required';
      isValid = false;
    }

    if (!location.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, voterId, location })
      });

      const data = await response.json();

      if (response.ok) {
        setSignupSuccess(true);
        setName('');
        setEmail('');
        setPassword('');
        setVoterId('');
        setLocation('');
        setErrors({});
        setTimeout(() => setSignupSuccess(false), 3000);
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred while signing up.');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 flex justify-center items-center text-white">
      <div className="bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="block text-indigo-400 text-3xl font-bold mb-8 text-center">Sign Up</h2>
        {signupSuccess && (
          <div className="bg-green-500 border-2 border-green-400 text-white px-4 py-3 rounded-md relative mb-6" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Signup successful.</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="name">Name</label>
            <input
              className={`w-full px-4 py-3 text-gray-300 bg-gray-700 border rounded-md focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
              id="name"
              type="text"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs italic mt-2">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">Email</label>
            <input
              className={`w-full px-4 py-3 text-gray-300 bg-gray-700 border rounded-md focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
              id="email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs italic mt-2">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">Password</label>
            <input
              className={`w-full px-4 py-3 text-gray-300 bg-gray-700 border rounded-md focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-600'}`}
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-xs italic mt-2">{errors.password}</p>}
          </div>

          {/* Voter ID */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="voterId">Voter ID</label>
            <input
              className={`w-full px-4 py-3 text-gray-300 bg-gray-700 border rounded-md focus:outline-none ${errors.voterId ? 'border-red-500' : 'border-gray-600'}`}
              id="voterId"
              type="text"
              placeholder="Enter your Voter ID"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
            />
            {errors.voterId && <p className="text-red-500 text-xs italic mt-2">{errors.voterId}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="location">Location</label>
            <input
              className={`w-full px-4 py-3 text-gray-300 bg-gray-700 border rounded-md focus:outline-none ${errors.location ? 'border-red-500' : 'border-gray-600'}`}
              id="location"
              type="text"
              placeholder="Enter your Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {errors.location && <p className="text-red-500 text-xs italic mt-2">{errors.location}</p>}
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md py-3 focus:outline-none"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
