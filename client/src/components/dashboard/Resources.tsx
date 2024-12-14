import React from "react";
import { motion } from "framer-motion";
import { FileText, Video, Headphones, Download } from "lucide-react";

const Resources = () => {
  const resources = [
    { id: 1, title: "Programming Fundamentals", type: "PDF", icon: FileText },
    { id: 2, title: "Data Structures Tutorial", type: "Video", icon: Video },
    { id: 3, title: "Microprocessor Lectures", type: "Audio", icon: Headphones },
    { id: 4, title: "MATLAB Software", type: "Download", icon: Download },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <motion.div
            key={resource.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
          >
            <resource.icon className="text-blue-600 mb-4" size={32} />
            <h2 className="text-lg font-semibold mb-2 text-center">{resource.title}</h2>
            <p className="text-gray-600 mb-4">{resource.type}</p>
            <button className="mt-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
              Access Resource
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
