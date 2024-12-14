import React from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, Filter } from "lucide-react";

const Students = () => {
  const students = [
    { id: 1, name: "Aarav Patel", course: "Computer Science Engineering", year: "2nd Year" },
    { id: 2, name: "Zara Khan", course: "Information Technology", year: "1st Year" },
    { id: 3, name: "Vikram Singh", course: "Mechanical Engineering", year: "3rd Year" },
    { id: 4, name: "Ananya Sharma", course: "Data Science", year: "1st Year" },
    { id: 5, name: "Rohan Gupta", course: "Electronics & Communication", year: "2nd Year" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Students</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
              <UserPlus size={20} className="mr-2" />
              Add Student
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300">
              <Filter size={20} className="mr-2" />
              Filter
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Course</th>
              <th className="px-4 py-2 text-left">Year</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <motion.tr key={student.id} whileHover={{ backgroundColor: "#f3f4f6" }}>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.course}</td>
                <td className="px-4 py-2">{student.year}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                  <span className="mx-2">|</span>
                  <button className="text-green-600 hover:text-green-800">Edit</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
