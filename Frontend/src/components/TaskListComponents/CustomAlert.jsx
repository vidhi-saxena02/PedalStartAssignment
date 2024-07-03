import React from "react";

const Toast = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg">
      <div>{message}</div>
      <button
        onClick={onClose}
        className="ml-2 text-gray-300 hover:text-white focus:outline-none"
      >
        Close
      </button>
    </div>
  );
};

export default Toast;
