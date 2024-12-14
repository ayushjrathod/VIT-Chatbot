import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminDashboard from "./components/AdminDashboard.jsx";
import SiteChatbot from "./components/Chatbot.jsx";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route
          path="/"
          element={
            <div>
              <Navbar />
              <Hero />
              {/* <Features /> */}
              {/* <Testimonial /> */}
              {/* <CallToAction /> */}
              {/* <Footer /> */}
              <SiteChatbot />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
