import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import SiteChatbot from "./components/Chatbot.jsx";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route
          path="/"
          element={
            <div>
              <Navbar />
              <Hero />
              <SiteChatbot />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
