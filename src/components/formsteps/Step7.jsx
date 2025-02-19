import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FaGlobe, FaPhoneAlt, FaEnvelope, FaUserFriends, FaNewspaper, FaBullhorn } from "react-icons/fa";

const referralOptions = [
  { label: "Online Search", icon: <FaGlobe />, description: "Found us via search engines like Google." },
  { label: "Phone Call", icon: <FaPhoneAlt />, description: "Referred through a direct phone call." },
  { label: "Email", icon: <FaEnvelope />, description: "Received information through an email." },
  { label: "Friend/Family", icon: <FaUserFriends />, description: "Recommended by someone you know." },
  { label: "Advertisement", icon: <FaNewspaper />, description: "Saw an ad on various platforms." },
  { label: "Social Media", icon: <FaBullhorn />, description: "Discovered us via social media channels." },
];

const Step7 = () => {
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
        How Did You Hear About Us?
      </motion.h2>
      <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
        Select the referral source that led you to Equimax.
      </p>
      <Formik
        initialValues={{ referralSource: formData.referralSource }}
        validationSchema={Yup.object({ referralSource: Yup.string().required("Please select a referral source.") })}
        onSubmit={(values) => {
          setFormData({ ...formData, ...values });
          navigate("/step8");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {referralOptions.map(({ label, icon, description }) => (
                <motion.button
                  key={label}
                  type="button"
                  onClick={() => setFieldValue("referralSource", label)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex flex-col items-center justify-between gap-3 p-5 rounded-xl border-2 shadow-sm transition-all duration-200 ${
                    values.referralSource === label
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-gray-50 border-gray-300 text-gray-800 hover:border-green-500 hover:bg-green-50"
                  }`}
                >
                  <div className={`text-3xl ${values.referralSource === label ? "text-white" : "text-green-600"}`}>{icon}</div>
                  <h3 className="text-sm sm:text-base font-semibold text-center leading-tight">{label}</h3>
                  <p className={`text-xs sm:text-sm text-center ${values.referralSource === label ? "text-green-100" : "text-gray-500"}`}>
                    {description}
                  </p>
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

export default Step7;