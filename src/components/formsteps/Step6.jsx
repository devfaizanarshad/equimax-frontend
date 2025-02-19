import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext.jsx";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const states = ["California", "Nevada", "Idaho", "Texas", "Arizona"];

const Step6 = () => {
  const { formData, setFormData } = useFormContext();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Select Property Location
      </motion.h2>
      <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
        Choose the state where the property is located.
      </p>
      <Formik
        initialValues={{ propertyState: formData.propertyState }}
        validationSchema={Yup.object({
          propertyState: Yup.string().required("Please select a state."),
        })}
        onSubmit={(values) => {
          setFormData({ ...formData, ...values });
          navigate("/step7");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {states.map((state) => (
                <motion.button
                  key={state}
                  type="button"
                  onClick={() => setFieldValue("propertyState", state)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center py-4 px-3 rounded-2xl border transition-all duration-200 shadow-sm text-sm sm:text-base font-semibold text-center leading-tight whitespace-nowrap ${
                    values.propertyState === state
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-green-50 hover:border-green-500"
                  }`}
                >
                  {state}
                </motion.button>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg text-sm sm:text-base font-medium shadow hover:bg-gray-300 transition"
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

export default Step6;