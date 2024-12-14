import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  LineChart,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Line,
  Pie,
  Cell,
} from "recharts";

const Analytics = () => {
  const enrollmentData = [
    { name: "Jan", students: 65 },
    { name: "Feb", students: 59 },
    { name: "Mar", students: 80 },
    { name: "Apr", students: 81 },
    { name: "May", students: 56 },
    { name: "Jun", students: 55 },
  ];

  const performanceData = [
    { name: "Week 1", average: 78 },
    { name: "Week 2", average: 82 },
    { name: "Week 3", average: 79 },
    { name: "Week 4", average: 85 },
    { name: "Week 5", average: 88 },
    { name: "Week 6", average: 90 },
  ];

  const courseDistributionData = [
    { name: "Computer Science", value: 35 },
    { name: "Information Technology", value: 25 },
    { name: "Mechanical", value: 20 },
    { name: "Electronics", value: 20 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monthly Enrollment</h2>
          <BarChart width={500} height={300} data={enrollmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#8884d8" />
          </BarChart>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Student Performance</h2>
          <LineChart width={500} height={300} data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="average" stroke="#82ca9d" />
          </LineChart>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Course Distribution</h2>
          <div className="flex justify-center">
            <PieChart width={400} height={400}>
              <Pie
                data={courseDistributionData}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {courseDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
