import React from 'react';
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
  { path: "/", title: "Borrower" },
  { path: "/step2", title: "Loan" },
  { path: "/step3", title: "Construction" },
  { path: "/step4", title: "Amount" },
  { path: "/step5", title: "Property" },
  { path: "/step6", title: "Location" },
  { path: "/step7", title: "Referral" },
  { path: "/step8", title: "Contact" },
];

const ProgressBar = () => {
  const location = useLocation();
  const currentStep = steps.findIndex((step) => step.path === location.pathname) + 1;
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`w-10 h-10 flex items-center justify-center rounded-full border-4 text-sm font-bold ${
                index + 1 < currentStep
                  ? "bg-green-600 border-green-600 text-white"
                  : index + 1 === currentStep
                  ? "bg-white border-green-600 text-green-700 shadow"
                  : "bg-gray-100 border-gray-300 text-gray-400"
              }`}
            >
              {index + 1}
            </motion.div>

            <span className={`mt-2 text-xs font-medium text-center ${
              index + 1 === currentStep ? "text-green-700" : "text-gray-500"
            } w-16 truncate`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-green-500 to-green-700 h-3 rounded-full shadow"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <div className="flex justify-between mt-3 text-xs font-medium text-gray-600">
        <span>Step {currentStep}/{steps.length}</span>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;