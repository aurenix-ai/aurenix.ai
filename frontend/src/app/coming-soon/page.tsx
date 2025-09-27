'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

export default function ComingSoonPage() {
  // --- Set your target launch date here ---
  const launchDate = new Date('2025-12-31T00:00:00');

  const calculateTimeLeft = () => {
    const difference = +launchDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (timeLeft[interval] === undefined) {
      return null;
    }
    return (
      <motion.div
        key={interval}
        className="text-center bg-gray-800/50 p-4 rounded-lg shadow-lg border border-gray-700" // Darker timer boxes
        whileHover={{ scale: 1.05, borderColor: 'rgba(192, 132, 252, 0.5)' }} // Subtle hover border glow
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="text-4xl md:text-5xl font-bold text-white">
          {String(timeLeft[interval]).padStart(2, '0')}
        </div>
        <div className="text-xs uppercase tracking-widest opacity-75 mt-1 text-gray-300">
          {interval}
        </div>
      </motion.div>
    );
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-950 to-black text-white p-4 overflow-hidden relative"> {/* Adjusted dark gradient */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'url("/path/to/subtle-dark-texture.png")', backgroundSize: 'cover', backgroundBlendMode: 'overlay' }}>
        {/* Optional: Add a subtle dark texture image here for more depth */}
      </div>
      <motion.div
        className="text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-3 tracking-tighter"
          variants={itemVariants}
        >
          <span className="text-purple-400">Our Universe</span> is Expanding
        </motion.h1>

        <motion.p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto text-gray-200" variants={itemVariants}>
          Something incredible is on the horizon. We're crafting a new experience
          and can't wait to share it with you.
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10"
          variants={itemVariants}
        >
          {timerComponents}
        </motion.div>

        {/* Email Subscription Form */}
        <motion.div variants={itemVariants}>
          <p className="mb-4 text-gray-300">Be the first to know when we launch:</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing!'); // Replace with actual submission logic
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-grow px-4 py-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300 placeholder-gray-500 text-white" // Darker input field
            />
            <motion.button
              type="submit"
              className="flex items-center justify-center gap-2 bg-purple-600 px-6 py-3 rounded-md font-semibold text-white hover:bg-purple-700 transition-colors duration-300 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(192, 132, 252, 0.7)' }} // Added glow on hover
              whileTap={{ scale: 0.95 }}
            >
              Notify Me <FiSend />
            </motion.button>
          </form>
        </motion.div>
        
        <motion.p className="text-sm opacity-50 mt-12 text-gray-400" variants={itemVariants}>
          aurenix.ai
        </motion.p>
      </motion.div>
    </div>
  );
}