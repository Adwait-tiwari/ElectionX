import React from "react";

const PopupDialog = ({ open, onClose, result }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded-xl text-white w-96 relative shadow-lg transition-all duration-300 transform hover:scale-105">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl font-bold"
        >
          &times;
        </button>

        {result ? (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-6 text-green-400">
              Congratulations!
            </h2>
            <div className="text-center">
              <p className="text-lg font-medium">The winner is:</p>
              <p className="text-2xl font-semibold mt-2 text-white">{result.name}</p>
              <p className="text-xl mt-2 text-gray-300">Party: {result.partyName}</p>
              <p className="text-xl mt-1 text-gray-300">Votes: {result.voteCount}</p>
              <p className="text-xl mt-1 text-gray-300">Location: {result.location}</p> 
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-400">Loading result...</p>
        )}
      </div>
    </div>
  );
};

export default PopupDialog;
