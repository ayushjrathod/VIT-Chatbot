import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, Bell, Lock, User, Globe, HelpCircle } from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-6">
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="text-blue-600 mr-4" size={24} />
              <div>
                <h2 className="text-lg font-semibold">Notifications</h2>
                <p className="text-sm text-gray-600">Manage your email notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between">
            <div className="flex items-center">
              <Lock className="text-blue-600 mr-4" size={24} />
              <div>
                <h2 className="text-lg font-semibold">Security</h2>
                <p className="text-sm text-gray-600">Manage your account security settings</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
              Update
            </button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between">
            <div className="flex items-center">
              <User className="text-blue-600 mr-4" size={24} />
              <div>
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="text-sm text-gray-600">Manage your profile information</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
              Edit
            </button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="text-blue-600 mr-4" size={24} />
              <div>
                <h2 className="text-lg font-semibold">Language</h2>
                <p className="text-sm text-gray-600">Choose your preferred language</p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
              <option value="Tamil">Tamil</option>
            </select>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between">
            <div className="flex items-center">
              <HelpCircle className="text-blue-600 mr-4" size={24} />
              <div>
                <h2 className="text-lg font-semibold">Help & Support</h2>
                <p className="text-sm text-gray-600">Get help or contact support</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
              Contact
            </button>
          </motion.div>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center mx-auto">
            <Save className="mr-2" size={20} />
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
