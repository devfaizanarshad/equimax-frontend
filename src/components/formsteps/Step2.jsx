import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext.jsx";
import { motion } from "framer-motion";
import { FaShoppingCart, FaSyncAlt } from "react-icons/fa";

const options = [
  { label: "Purchase", icon: <FaShoppingCart /> },
  { label: "Refinance", icon: <FaSyncAlt /> },
];

const Step2 = () => {
  const { formData, setFormData } = useFormContext();
  const navigate = useNavigate();

  const handleSelection = (label) => {
    setFormData({ ...formData, loanType: label }); // Update global form data
    navigate("/step3"); // Auto-navigate to Step 3
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-10">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Select Loan Type
      </motion.h2>
      <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
        Are you looking to purchase or refinance?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map(({ label, icon }) => (
          <motion.button
            key={label}
            type="button"
            onClick={() => handleSelection(label)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`flex flex-col items-center justify-center p-5 rounded-xl border text-base font-medium transition-all duration-200 shadow-sm ${
              formData.loanType === label
                ? "bg-green-600 border-green-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-800 hover:border-green-500 hover:bg-green-50"
            }`}
          >
            <div
              className={`text-3xl mb-2 ${
                formData.loanType === label ? "text-white" : "text-green-600"
              }`}
            >
              {icon}
            </div>
            <span className="text-sm sm:text-base font-semibold">{label}</span>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm sm:text-base font-medium shadow hover:bg-gray-300"
        >
          Previous
        </button>
      </div>
    </div>
  );
};

export default Step2;
