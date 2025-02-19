import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FaUserTie, FaUserAlt } from "react-icons/fa";

const options = [
  { label: "Broker", icon: <FaUserTie /> },
  { label: "Borrower", icon: <FaUserAlt /> },
];

const Step1 = () => {
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
        Select Your Role
      </motion.h2>
      <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
        Are you applying as a broker or borrower? Choose below.
      </p>
      <Formik
        initialValues={{ borrowerType: formData.borrowerType }}
        validationSchema={Yup.object({ borrowerType: Yup.string().required("Please select an option") })}
        onSubmit={(values) => {
          setFormData({ ...formData, ...values });
          navigate("/step2");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {options.map(({ label, icon }) => (
                <motion.button
                  key={label}
                  type="button"
                  onClick={() => setFieldValue("borrowerType", label)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex flex-col items-center justify-center p-5 rounded-xl border text-base font-medium transition-all duration-200 shadow-sm ${
                    values.borrowerType === label
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-gray-50 border-gray-300 text-gray-800 hover:border-green-500 hover:bg-green-50"
                  }`}
                >
                  <div className={`text-3xl mb-2 ${values.borrowerType === label ? "text-white" : "text-green-600"}`}>{icon}</div>
                  <span className="text-sm sm:text-base font-semibold">
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>

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

export default Step1;