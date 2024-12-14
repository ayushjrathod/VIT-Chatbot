import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Code, Database, Monitor, Cpu } from "lucide-react";

const Schedule = () => {
  const events = [
    { id: 1, title: "Data Structures Lab", time: "09:00 AM", instructor: "Dr. Sharma", icon: Code },
    { id: 2, title: "Database Management Lecture", time: "11:30 AM", instructor: "Prof. Gupta", icon: Database },
    { id: 3, title: "Computer Networks Workshop", time: "02:00 PM", instructor: "Dr. Patel", icon: Monitor },
    { id: 4, title: "Digital Electronics Practical", time: "04:30 PM", instructor: "Prof. Reddy", icon: Cpu },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Schedule</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Today's Events</h2>
          <div className="flex items-center text-gray-600">
            <Calendar className="mr-2" size={20} />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        <div className="space-y-4">
          {events.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center p-4 bg-gray-50 rounded-lg"
            >
              <event.icon className="text-blue-600 mr-4" size={24} />
              <div className="flex-grow">
                <h3 className="font-semibold">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Clock className="mr-2" size={16} />
                  <span>{event.time}</span>
                  <Users className="ml-4 mr-2" size={16} />
                  <span>{event.instructor}</span>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-300">
                Join
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
