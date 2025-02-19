import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from "./components/context/FormContext";
import ProgressBar from "./components/ProgressBar";
import SuccessPage from "./components/SuccessPage";
import Header from "./components/Header";
import Step1 from "./components/formSteps/Step1";
import Step2 from "./components/formSteps/Step2";
import Step3 from "./components/formSteps/Step3";
import Step4 from "./components/formSteps/Step4";
import Step5 from "./components/formSteps/Step5";
import Step6 from "./components/formSteps/Step6";
import Step7 from "./components/formSteps/Step7";
import Step8 from "./components/formSteps/Step8";

function App() {
  return (
    <FormProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="min-h-[calc(100vh-64px)] flex items-center justify-center py-6 px-4">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-5 sm:p-6 border border-gray-200">
              <div className="mb-4">  {/* Reduced margin for a tighter layout */}
                <ProgressBar />
              </div>
              <Routes>
                <Route path="/" element={<Step1 />} />
                <Route path="/step2" element={<Step2 />} />
                <Route path="/step3" element={<Step3 />} />
                <Route path="/step4" element={<Step4 />} />
                <Route path="/step5" element={<Step5 />} />
                <Route path="/step6" element={<Step6 />} />
                <Route path="/step7" element={<Step7 />} />
                <Route path="/step8" element={<Step8 />} />
                <Route path="/success" element={<SuccessPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </FormProvider>
  );
}

export default App;
