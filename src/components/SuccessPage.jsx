import React from 'react';

import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const SuccessPage = () => {
  return (
    <div className="text-center p-8 rounded-lg max-w-md mx-auto">
      <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Application Submitted!</h2>
      <p className="text-gray-600 mb-6">Thank you for applying. We will get back to you shortly</p>
      <Link to="/" className="bg-green-600 text-white px-6 py-2 rounded">
        Start New Application
      </Link>
    </div>
  );
};

export default SuccessPage;
