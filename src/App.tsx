import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import DetailPage from "@/pages/DetailPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/project/:id" element={<DetailPage />} />
    </Routes>
  );
};

export default App;
