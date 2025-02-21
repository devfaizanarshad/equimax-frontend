import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext.jsx";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FaBuilding, FaWarehouse, FaHome, FaHotel, FaClinicMedical, FaIndustry } from "react-icons/fa";

const propertyOptions = [
  { label: "Retail Space", icon: <FaBuilding />, description: "Shops, malls, and commercial stores." },
  { label: "Self-Storage", icon: <FaWarehouse />, description: "Personal and commercial storage units." },
  { label: "Residential", icon: <FaHome />, description: "Apartments, houses, and condos." },
  { label: "Hospitality/Hotel", icon: <FaHotel />, description: "Hotels, motels, and guest accommodations." },
  { label: "Healthcare", icon: <FaClinicMedical />, description: "Clinics, hospitals, and medical facilities." },
  { label: "Light Industrial", icon: <FaIndustry />, description: "Warehouses, factories, and manufacturing units." },
];

const Step5 = () => {
  const { formData, setFormData } = useFormContext();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl p-10">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Select Property Type
      </motion.h2>
      <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
        Choose the type of property you are financing.
      </p>
      <Formik
        initialValues={{ propertyType: formData.propertyType }}
        validationSchema={Yup.object({ propertyType: Yup.string().required("Please select a property type.") })}
        onSubmit={(values) => {
          setFormData({ ...formData, ...values });
          navigate("/step6");
        }}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {propertyOptions.map(({ label, icon, description }) => (
                <motion.button
                  key={label}
                  type="button"
                  onClick={() => {
                    setFieldValue("propertyType", label);
                    setFormData((prev) => ({ ...prev, propertyType: label }));
                    navigate("/step6");
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex flex-col items-center justify-between gap-3 p-5 rounded-xl border-2 shadow-sm transition-all duration-200 ${
                    formData.propertyType === label
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-gray-50 border-gray-300 text-gray-800 hover:border-green-500 hover:bg-green-50"
                  }`}
                >
                  <div className={`text-3xl ${formData.propertyType === label ? "text-white" : "text-green-600"}`}>{icon}</div>
                  <h3 className="text-sm sm:text-base font-semibold text-center leading-tight">{label}</h3>
                  <p className={`text-xs sm:text-sm text-center ${formData.propertyType === label ? "text-green-100" : "text-gray-500"}`}>
                    {description}
                  </p>
                </motion.button>
              ))}
            </div>

            <div className="flex justify-start mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
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

export default Step5;