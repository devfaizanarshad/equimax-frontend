import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext.jsx";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FaHammer, FaTools, FaBan } from "react-icons/fa";

const options = [
  { label: "None", icon: <FaBan />, description: "No construction or rehab required." },
  { label: "Rehab", icon: <FaTools />, description: "Renovation or improvement of an existing property." },
  { label: "Ground-up construction", icon: <FaHammer />, description: "Building a new property from the ground up." },
];

const Step3 = () => {
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
        Construction or Rehab Component
      </motion.h2>
      <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
        Select the type of construction or rehab involved.
      </p>

      <Formik
        initialValues={{ constructionType: formData.constructionType }}
        validationSchema={Yup.object({
          constructionType: Yup.string().required("Please select an option"),
        })}
        onSubmit={(values) => {
          setFormData({ ...formData, ...values });
          navigate("/step4"); // Auto-navigate after selection
        }}
      >
        {({ setFieldValue, handleSubmit }) => (
          <Form className="space-y-6">
            <div className="flex flex-col gap-4">
              {options.map(({ label, icon, description }) => (
                <motion.button
                  key={label}
                  type="button"
                  onClick={() => {
                    setFieldValue("constructionType", label);
                    setFormData({ ...formData, constructionType: label });
                    handleSubmit(); // Auto-submit and navigate to next step
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex gap-4 p-5 rounded-xl border text-left transition-all duration-200 shadow-sm ${
                    formData.constructionType === label
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-gray-50 border-gray-300 text-gray-800 hover:border-green-500 hover:bg-green-50"
                  }`}
                >
                  <div className={`flex-shrink-0 text-3xl w-14 h-14 flex items-center justify-center rounded-full ${
                    formData.constructionType === label ? "bg-green-500 text-white" : "bg-gray-100 text-green-600"
                  }`}>
                    {icon}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-sm sm:text-base font-semibold mb-1">{label}</h3>
                    <p className={`text-xs sm:text-sm ${
                      formData.constructionType === label ? "text-green-100" : "text-gray-500"
                    }`}>
                      {description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="flex justify-start mt-6">
              <button
                type="button"
                onClick={() => navigate("/step2")}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm sm:text-base font-medium shadow hover:bg-gray-300"
              >
                Previous
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step3;