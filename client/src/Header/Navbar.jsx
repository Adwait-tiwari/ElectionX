import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { ContractAddress, ContractABI } from '../abi/config.js';
import { Menu } from 'lucide-react';

const baseNavItems = [
  { label: 'Home', href: '/' },
  { label: 'Register', href: '/register' },
  { label: 'Dashboard', href: '/dashboard' },
];

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [contract, setContract] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      if (typeof window.ethereum === 'undefined') return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      const contract = new ethers.Contract(ContractAddress, ContractABI, signer);
      const adminAddress = await contract.admin();

      if (address.toLowerCase() === adminAddress.toLowerCase()) {
        setIsAdmin(true);
      }

      setContract(contract);
    };

    checkAdmin();
  }, []);

  const navItems = isAdmin
    ? [...baseNavItems, { label: 'Admin Panel', href: '/admin' }]
    : baseNavItems;

  const avatarUrl = walletAddress
    ? `https://api.dicebear.com/7.x/identicon/svg?seed=${walletAddress}`
    : null;

  // ✅ Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT
    setWalletAddress(''); // Clear local wallet state
    navigate('/login'); // Redirect to login form
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                ElectionX
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ✅ Wallet Avatar */}
          {walletAddress && (
            <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogout}>
              <span className="text-gray-400 text-sm hidden md:block">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-9 h-9 rounded-full border border-gray-600 hover:opacity-80"
                title="Click to logout"
              />
            </div>
          )}

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className={isMobileMenuOpen ? 'md:hidden' : 'hidden md:hidden'}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
