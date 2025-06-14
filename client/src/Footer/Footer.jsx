function Footer(){
    return(
        <footer className="bg-gray-800 py-8 text-gray-400 text-center">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} myProject Decentralized Voting Application. All rights reserved.</p>
        </div>
      </footer>
    );
}

export default Footer;