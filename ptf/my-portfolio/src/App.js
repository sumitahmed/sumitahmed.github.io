import React from "react";
import { motion } from "framer-motion";

const App = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center justify-center text-white">
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl font-extrabold tracking-wider">SK Sumit Ahmed</h1>
        <p className="text-lg mt-2 text-gray-200">
          Search Engine Evaluator | Web Developer | Cybersecurity Enthusiast
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex space-x-4 mt-6"
      >
        <a
          href="https://www.linkedin.com/in/sk-sumit-ahmed-67a30227b/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          LinkedIn
        </a>
        <a
          href="mailto:sksumitahmed007@gmail.com"
          className="px-6 py-2 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Contact Me
        </a>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-10 grid grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-xl text-gray-900"
      >
        <h2 className="col-span-2 text-2xl font-bold text-center">Skills</h2>
        <span className="px-4 py-2 bg-gray-200 rounded-md">C / C++</span>
        <span className="px-4 py-2 bg-gray-200 rounded-md">Python</span>
        <span className="px-4 py-2 bg-gray-200 rounded-md">JavaScript</span>
        <span className="px-4 py-2 bg-gray-200 rounded-md">React.js</span>
        <span className="px-4 py-2 bg-gray-200 rounded-md">Cybersecurity</span>
        <span className="px-4 py-2 bg-gray-200 rounded-md">Web Development</span>
      </motion.div>
    </div>
  );
};

export default App;
