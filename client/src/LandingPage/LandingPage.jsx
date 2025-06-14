import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const LandingPage = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate function

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/dashboard'); // User is logged in
    } else {
      navigate('/login'); // User is not logged in
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col text-white">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <section className="py-16 bg-gray-900" style={{ backgroundImage: 'url(https://media.istockphoto.com/id/2181544373/photo/presidential-election-betting.jpg?s=1024x1024&w=is&k=20&c=kY8_4eDn-H14jm_VBVfhJTXhff8-FQ3ODyMYSuG3i_M=)', backgroundSize: 'cover', backgroundBlendMode: 'overlay' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-indigo-400">Secure and Transparent Decentralized Voting</h1>
          <p className="text-lg text-gray-300 mb-8">Empowering fair elections through blockchain technology.</p>
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-900 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-teal-400">Tamper-Proof Voting</h3>
            <p className="text-gray-300">Leverage the immutability of the blockchain to ensure every vote is securely recorded and cannot be altered.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-900 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-teal-400">Enhanced Transparency</h3>
            <p className="text-gray-300">Provide auditable and transparent election processes, building trust among voters and stakeholders.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-900 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-teal-400">Increased Accessibility</h3>
            <p className="text-gray-300">Enable secure voting from anywhere, increasing participation and convenience for all eligible voters.</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-900 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-purple-400">Reduced Fraud</h3>
            <p className="text-gray-300">Minimize the risk of fraudulent activities through cryptographic security and decentralized verification.</p>
          </div>

          {/* Feature 5 */}
          <div className="bg-gray-900 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-purple-400">Cost-Effective Solution</h3>
            <p className="text-gray-300">Potentially lower the costs associated with traditional election processes, such as printing and manual counting.</p>
          </div>

          {/* Feature 6 */}
          <div className="bg-gray-900 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-purple-400">Real-Time Auditing</h3>
            <p className="text-gray-300">Allow for real-time monitoring and auditing of the voting process without compromising voter anonymity.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-indigo-400">Ready to Experience the Future of Voting?</h2>
          <p className="text-lg text-gray-300 mb-8">Join our community and be a part of the revolution in secure and transparent elections.</p>
          <button 
            onClick={handleGetStarted} 
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default LandingPage;
