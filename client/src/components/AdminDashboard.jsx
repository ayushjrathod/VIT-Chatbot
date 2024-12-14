import { motion } from "framer-motion";
import { PlaneIcon as Airplane, BarChart, Book, Calendar, Settings, Users } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UpdateKnowledgeBase from "./UpdateKnowledgeBase";
import Analytics from "./dashboard/Analytics";
import Courses from "./dashboard/Courses";
import Resources from "./dashboard/Resources";
import Schedule from "./dashboard/Schedule";
import SettingsPage from "./dashboard/Settings";
import Students from "./dashboard/Students";

const Dashboard = () => {
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Airplane, text: "Courses", path: "/admin/courses" },
    { icon: Book, text: "Resources", path: "/admin/resources" },
    { icon: Calendar, text: "Schedule", path: "/admin/schedule" },
    { icon: Users, text: "Students", path: "/admin/students" },
    { icon: BarChart, text: "Analytics", path: "/admin/analytics" },
    { icon: Settings, text: "Settings", path: "/admin/settings" },
  ];

  const renderComponent = () => {
    const path = location.pathname;
    switch (path) {
      case "/admin/courses":
        return <Courses />;
      case "/admin/resources":
        return <Resources />;
      case "/admin/schedule":
        return <Schedule />;
      case "/admin/students":
        return <Students />;
      case "/admin/analytics":
        return <Analytics />;
      case "/admin/settings":
        return <SettingsPage />;
      default:
        return <Courses />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <motion.div className="w-64 bg-gray-800 p-6 min-h-screen">
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <Link
                  to={item.path}
                  className={`flex items-center text-gray-300 hover:text-white ${
                    location.pathname === item.path ? "text-white" : ""
                  }`}
                >
                  <item.icon className="mr-3" size={20} />
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* Main content */}
      <div className="flex-1">
        <div className="p-8 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Hello, Admin</h1>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="z-123456 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center gap-2"
              >
                Home
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsKnowledgeBaseOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center gap-2"
              >
                Update Knowledge Base
              </motion.button>
            </div>
          </div>
          {renderComponent()}
        </div>
      </div>

      {isKnowledgeBaseOpen && <UpdateKnowledgeBase onClose={() => setIsKnowledgeBaseOpen(false)} />}
    </div>
  );
};

export default Dashboard;
