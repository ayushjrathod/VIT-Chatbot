import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import UpdateKnowledgeBase from "./UpdateKnowledgeBase";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  // Fetch all questions from the backend
  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/get-all-questions`);
      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to fetch questions. Please try again.");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle deleting a question
  const handleDelete = async (serialNo) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the question with Serial No: ${serialNo}?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/delete-question?serial_no=${serialNo}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(data.message || "Question deleted successfully.");
        setQuestions(questions.filter((q) => q.serial_no !== serialNo));
      } else {
        alert(`Failed to delete question: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question. Please try again.");
    }
  };

  // Handle editing a question
  const handleEdit = (question) => {
    setEditData(question);
    setIsEditOpen(true);
  };

  // Refresh questions after edit
  const refreshQuestions = () => {
    fetchQuestions();
  };

  // Filtered questions based on global search term
  const filteredQuestions = questions.filter((q) =>
    Object.values(q).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Highlight search term in results
  const highlightSearchTerm = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  // Calculate total pages based on filtered questions
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  // Get current page questions
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">All Questions</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search all fields..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Serial No</th>
            <th className="border px-4 py-2">Question</th>
            <th className="border px-4 py-2">Answer</th>
            <th className="border px-4 py-2">More Info</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentQuestions.map((q) => (
            <tr key={q.serial_no}>
              <td
                className="border px-4 py-2"
                dangerouslySetInnerHTML={{
                  __html: highlightSearchTerm(q.serial_no.toString()),
                }}
              />
              <td
                className="border px-4 py-2"
                dangerouslySetInnerHTML={{
                  __html: highlightSearchTerm(q.question),
                }}
              />
              <td
                className="border px-4 py-2"
                dangerouslySetInnerHTML={{
                  __html: highlightSearchTerm(q.answer),
                }}
              />
              <td
                className="border px-4 py-2"
                dangerouslySetInnerHTML={{
                  __html: highlightSearchTerm(q.more_info || "None"),
                }}
              />
              <td className="border px-4 py-2">
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(q)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-300"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(q.serial_no)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </motion.button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="inline-flex -space-x-px">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-3 py-2 leading-tight border border-gray-300 ${
                    currentPage === number
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                  currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Render the UpdateKnowledgeBase component for editing */}
      {isEditOpen && (
        <UpdateKnowledgeBase
          onClose={() => {
            setIsEditOpen(false);
            refreshQuestions();
          }}
          editData={editData}
        />
      )}
    </div>
  );
};

export default QuestionsList;
