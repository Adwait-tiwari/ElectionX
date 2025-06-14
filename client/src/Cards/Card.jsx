function Card({index,title,age,partyName,location,contract}){

  const handleClick = async()=>{
    try{
      if (!contract) {
        console.error("Contract not available");
        return;
      }
      const tx = await contract.startVote(title,partyName,location);
      await tx.wait();
      alert("Vote started successfully!");
    }catch(err){
      console.log(err);
    }
  }

    return(
      <div className="min-h-screen bg-gray-900 p-3" key = {index}>
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
          <p className="text-gray-300 mb-4">
            Age of the Candidate : {age}
          </p>
          <p className="text-gray-300 mb-4">
            Party Name : {partyName}
          </p>
          <p className="text-gray-300 mb-4">
            Location : {location}
          </p>
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Verify People
          </button>
        </div>
      </div>
    );
}

export default Card;