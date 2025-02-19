import React from 'react';
import { useNavigate } from "react-router-dom";

const StepNavigation = ({ prevStep, nextStep, isLastStep }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mt-8">
      {prevStep ? (
        <button
          onClick={() => navigate(prevStep)}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg text-sm sm:text-base font-semibold shadow hover:bg-gray-300 transition-transform transform hover:scale-105"
        >
          Previous
        </button>
      ) : (
        <div></div>
      )}

      <button
        type="submit"
        className={`px-8 py-3 rounded-lg text-sm sm:text-base font-semibold shadow-lg transition-transform transform hover:scale-105 ${
          isLastStep
            ? "bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800"
            : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
        }`}
      >
        {isLastStep ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default StepNavigation;