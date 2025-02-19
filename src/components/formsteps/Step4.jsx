import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const quickAmounts = [100000, 250000, 500000, 750000, 1000000];

const Step4 = () => {
  const { formData, setFormData } = useFormContext();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-10">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Desired Loan Amount
      </motion.h2>
      <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
        Select the total loan amount you are applying for.
      </p>
      <Formik
        initialValues={{ loanAmount: formData.loanAmount || 250000 }}
        validationSchema={Yup.object({
          loanAmount: Yup.number()
            .min(100000, "Minimum amount is $100,000")
            .max(5000000, "Maximum amount is $5,000,000")
            .required("Please enter a loan amount"),
        })}
        onSubmit={(values) => {
          setFormData({ ...formData, ...values });
          navigate("/step5");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-8">
            {/* Quick Select Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickAmounts.map((amount) => (
                <motion.button
                  key={amount}
                  type="button"
                  onClick={() => setFieldValue("loanAmount", amount)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`py-3 rounded-xl border text-center font-medium transition-all duration-200 shadow-sm ${
                    values.loanAmount === amount
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-gray-50 border-gray-300 text-gray-800 hover:border-green-500 hover:bg-green-50"
                  }`}
                >
                  ${amount.toLocaleString()}
                </motion.button>
              ))}
            </div>

            {/* Numeric Input */}
            <div className="flex flex-col items-center gap-4">
              <label htmlFor="loanAmount" className="text-sm sm:text-base font-semibold text-gray-700">
                Enter Custom Amount:
              </label>
              <Field
                name="loanAmount"
                type="number"
                min="100000"
                max="5000000"
                step="50000"
                className="w-full sm:w-2/3 text-center text-lg sm:text-xl font-semibold py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={values.loanAmount}
                onChange={(e) => setFieldValue("loanAmount", Number(e.target.value))}
              />
              <p className="text-gray-600 text-sm sm:text-base">
                Selected Amount: <span className="font-bold">${values.loanAmount.toLocaleString()}</span>
              </p>
            </div>

            {/* Slider */}
            <div className="mt-2">
              <input
                type="range"
                min="100000"
                max="5000000"
                step="50000"
                value={values.loanAmount}
                onChange={(e) => setFieldValue("loanAmount", Number(e.target.value))}
                className="w-full accent-green-600"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm sm:text-base font-medium shadow hover:bg-gray-300"
              >
                Previous
              </button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-3 rounded-lg text-sm sm:text-base font-semibold shadow-lg hover:from-green-600 hover:to-green-800"
              >
                Continue
              </motion.button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step4;