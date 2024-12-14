import { motion } from "framer-motion";
import { Code, Cog, Cpu, Database, Network, Radio } from "lucide-react";
import React from "react";

const Courses = () => {
  const courses = [
    { id: 1, title: "Computer Science Engineering", duration: "4 years", icon: Cpu },
    { id: 2, title: "Information Technology", duration: "4 years", icon: Code },
    { id: 3, title: "Electronics & Communication", duration: "4 years", icon: Radio },
    { id: 4, title: "Mechanical Engineering", duration: "4 years", icon: Cog },
    { id: 5, title: "Data Science", duration: "4 years", icon: Database },
    { id: 6, title: "Artificial Intelligence & ML", duration: "4 years", icon: Network },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">B.Tech Programs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div key={course.id} whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-md">
            <course.icon className="text-blue-600 mb-4" size={32} />
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600">Duration: {course.duration}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
              Manage Course
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
