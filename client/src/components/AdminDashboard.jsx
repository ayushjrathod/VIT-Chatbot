import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionsList from "./QuestionsList";
import UpdateKnowledgeBase from "./UpdateKnowledgeBase";

const Dashboard = () => {
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex">
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
                Add Question to Database
              </motion.button>
            </div>
          </div>
          {/* Integrate the QuestionsList component */}
          <QuestionsList />
        </div>
      </div>
      {isKnowledgeBaseOpen && <UpdateKnowledgeBase onClose={() => setIsKnowledgeBaseOpen(false)} />}
    </div>
  );
};

export default Dashboard;
