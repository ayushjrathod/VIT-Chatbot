import { motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const UpdateKnowledgeBase = ({ onClose, editData }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setQuestion(editData.question);
      setAnswer(editData.answer);
      setMoreInfo(editData.more_info);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editData) {
        response = await fetch(`${import.meta.env.VITE_API_URL}/edit?serial_no=${editData.serial_no}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question, answer, more_info: moreInfo }),
        });
      } else {
        response = await fetch(`${import.meta.env.VITE_API_URL}/add-question`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question, answer, more_info: moreInfo }),
        });
      }

      if (response.ok) {
        alert(editData ? "Question updated successfully!" : "Knowledge base updated successfully!");
        setQuestion("");
        setAnswer("");
        setMoreInfo("");
        onClose();
        window.location.reload();
      } else {
        alert(
          editData
            ? "Failed to update question. Please try again."
            : "Failed to update knowledge base. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating knowledge base:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{editData ? "Edit Knowledge Base Entry" : "Update Knowledge Base"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
              Answer
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="moreInfo" className="block text-sm font-medium text-gray-700 mb-2">
              More Information
            </label>
            <textarea
              id="moreInfo"
              value={moreInfo}
              onChange={(e) => setMoreInfo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Add additional context or references..."
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {editData ? "Update" : "Submit"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateKnowledgeBase;
