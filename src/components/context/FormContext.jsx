import React from 'react';  // Add this line
import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    borrowerType: "",
    loanType: "",
    constructionType: "",
    loanAmount: "",
    propertyType: "",
    propertyState: "",
    referralSource: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
