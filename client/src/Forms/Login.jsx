import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [loading, setLoading] = useState(false); // To handle loading state for form submission
  const navigate = useNavigate(); // Initialize useNavigate

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

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
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isMetaMaskConnected && validateForm()) {
      setLoading(true); // Start loading when form is submitted

      try {
        // Send the login request to your backend
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setLoginSuccess(true);
          setEmail('');
          setPassword('');
          setErrors({});
          setTimeout(() => setLoginSuccess(false), 3000); // Clear success message after 3 seconds

          // Store the JWT token (you can store in localStorage or cookies)
          localStorage.setItem('token', data.token);
          localStorage.setItem('userEmail', email);

          // Redirect to the dashboard
          navigate('/dashboard'); // Automatically redirect after login
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred while logging in.');
      }

      setLoading(false); // Stop loading after the form submission process
    } else if (!isMetaMaskConnected) {
      alert('Please connect to MetaMask first.');
    }
  };

  const connectMetaMask = async () => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('MetaMask Connected! Accounts:', accounts);
        setIsMetaMaskConnected(true);
        alert('MetaMask connected successfully!');
      } catch (error) {
        console.error('Failed to connect MetaMask:', error);
        alert('Failed to connect to MetaMask. Please ensure it is installed and unlocked.');
      }
    } else {
      console.error('MetaMask is not installed!');
      alert('MetaMask is not installed. Please install the MetaMask browser extension.');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 flex justify-center items-center text-white">
      <div className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="block text-indigo-400 text-3xl font-bold mb-8 text-center">Login</h2>
        {loginSuccess && (
          <div className="bg-green-500 border-2 border-green-400 text-white px-4 py-3 rounded-md relative mb-6" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">Login successful.</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full px-4 py-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border border-gray-600 rounded-md ${errors.email ? 'border-red-500' : ''}`}
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
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`w-full px-4 py-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border border-gray-600 rounded-md ${errors.password ? 'border-red-500' : ''}`}
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-xs italic mt-2">{errors.password}</p>}
          </div>

          {/* MetaMask Connection Button */}
          <div>
            <button
              className={`w-full ${isMetaMaskConnected ? 'bg-green-500' : 'bg-blue-500'} hover:bg-blue-700 text-white font-semibold rounded-md py-3 focus:outline-none focus:shadow-outline`}
              type="button"
              onClick={connectMetaMask}
            >
              {isMetaMaskConnected ? 'MetaMask Connected' : 'Connect to MetaMask'}
            </button>
          </div>

          {/* Submit Button */}
          <div>
            <button
              className={`w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md py-3 focus:outline-none focus:shadow-outline ${!isMetaMaskConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={!isMetaMaskConnected || loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
