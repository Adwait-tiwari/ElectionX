function Header() {
    return(
        <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-indigo-400">ElectionX</div>
          <nav className="flex items-center">
            <a href="/login" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2">
              Login
            </a>
            <a href="/signup" className="bg-white hover:bg-gray-300 text-indigo-600 font-bold py-2 px-4 rounded">
              Sign Up
            </a>
          </nav>
        </div>
      </header>
    );
}

export default Header;