import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import axios from "axios";

const Step8 = () => {
  const { formData, setFormData } = useFormContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required."),
    email: Yup.string().email("Invalid email address.").required("Email is required."),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits.")
      .required("Phone number is required."),
    consent: Yup.boolean().oneOf([true], "Consent is required."),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setApiError("");

    try {
      // Update the form context with submitted values
      setFormData({ ...formData, ...values });

      // Send data to the API
      const response = await axios.post("https://equimax-backend-fkqp.vercel.app/api/submit-form", {
        ...formData,
        ...values,
      });

      if (response.status === 200) {
        navigate("/success"); // Navigate to success page on success
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-10">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Contact Information
      </motion.h2>

      <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
        Fill in your details to complete the application process.
      </p>

      {apiError && <div className="text-red-500 text-center mb-4">{apiError}</div>}

      <Formik
        initialValues={{
          fullName: formData.fullName || "",
          email: formData.email || "",
          phone: formData.phone || "",
          consent: formData.consent || false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-6">
            {/* Full Name */}
            <div className="relative">
              <Field
                name="fullName"
                type="text"
                placeholder=" "
                className="w-full border rounded-lg py-4 px-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-transparent"
              />
              <label
                htmlFor="fullName"
                className="absolute left-4 top-2 text-gray-500 text-sm pointer-events-none transform scale-90 origin-left -translate-y-7"
              >
                Full Name
              </label>
              <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Email */}
            <div className="relative">
              <Field
                name="email"
                type="email"
                placeholder=" "
                className="w-full border rounded-lg py-4 px-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-transparent"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-2 text-gray-500 text-sm pointer-events-none transform scale-90 origin-left -translate-y-7"
              >
                Email Address
              </label>
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Phone */}
            <div className="relative">
              <Field
                name="phone"
                type="tel"
                placeholder=" "
                className="w-full border rounded-lg py-4 px-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-transparent"
              />
              <label
                htmlFor="phone"
                className="absolute left-4 top-2 text-gray-500 text-sm pointer-events-none transform scale-90 origin-left -translate-y-7"
              >
                Phone Number
              </label>
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Consent */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-start gap-3">
                <Field
                  type="checkbox"
                  name="consent"
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="consent" className="text-gray-700 text-sm leading-relaxed">
                  <strong>Authorization *</strong><br />
                  By checking this box and clicking submit, I expressly agree to be contacted by telephone on my landline and/or cell phone by Equimax Management, regardless of whether my telephone number appears on any state or federal “Do Not Call” list. I further agree that Equimax Management may use an automated telephone dialing system or pre-recorded message to contact me via telephone or SMS/text. I understand that my consent to be contacted is not a requirement to purchase any goods or services, and standard cellular rates may apply.                </label>
              </div>
              <ErrorMessage name="consent" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Buttons */}
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
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                className={`${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                } bg-gradient-to-r from-green-500 to-green-700 text-white px-10 py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:from-green-600 hover:to-green-800`}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </motion.button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step8;
