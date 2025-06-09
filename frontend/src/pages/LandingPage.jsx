// LandingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaRupeeSign, FaBolt, FaChartBar, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const themeClasses = darkMode
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white'
    : 'bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900';

  return (
    <div className={`min-h-screen ${themeClasses} font-sans transition-colors duration-500`}> 
      {/* Header */}
      <header className="flex justify-between items-center p-6 relative z-10">
        <h1 className="text-2xl font-bold tracking-wide">Streamline</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4 items-center">
          <button onClick={toggleTheme} className="text-xl">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 border rounded-full hover:bg-opacity-20 transition border-current"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-4 py-2 bg-current text-white rounded-full hover:opacity-90 transition"
          >
            Reserve Access
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 right-6 bg-gray-800 text-white w-48 rounded-xl shadow-lg p-4 flex flex-col space-y-4 md:hidden">
            <button onClick={toggleTheme} className="flex items-center justify-start gap-2">
              {darkMode ? <FaSun /> : <FaMoon />} Toggle Theme
            </button>
            <button
              onClick={() => { toggleMenu(); navigate('/login'); }}
              className="px-4 py-2 border rounded hover:bg-gray-700 transition border-white text-left"
            >
              Login
            </button>
            <button
              onClick={() => { toggleMenu(); navigate('/signup'); }}
              className="px-4 py-2 bg-white text-black rounded hover:opacity-90 transition text-left"
            >
              Reserve Access
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-8 md:px-20 pt-16 pb-8 gap-12 min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-xl text-center md:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-semibold leading-tight">Your portal for diversification</h2>
          <p className="mt-6 text-lg opacity-80">Explore handpicked opportunities in private markets & global trade finance.</p>
          <button
            onClick={() => navigate('/signup')}
            className="mt-8 px-6 py-3 bg-white text-black rounded-full text-lg hover:scale-105 transition"
          >
            Reserve Access
          </button>
        </motion.div>

        <motion.div
          className="w-full md:w-[50%] h-[350px] md:h-[450px] bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="h-full flex items-center justify-center text-xl font-semibold text-white">
            Visual or Placeholder Animation Area
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-20 px-8 md:px-20 text-center bg-opacity-10"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-12">Why Choose Us</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <FeatureCard icon={<FaRupeeSign />} title="Low Ticket Size" desc="Start investing from just ₹10,000" />
          <FeatureCard icon={<FaLock />} title="Bank-Level Security" desc="Encrypted data & secure access." />
          <FeatureCard icon={<FaChartBar />} title="Research Driven" desc="Insights backed by expert analysis." />
          <FeatureCard icon={<FaBolt />} title="Fast & Simple" desc="Complete investments in 3 steps." />
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm opacity-60 border-t border-gray-700">
        © 2025 Streamline. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl shadow-lg border border-gray-600 h-full flex flex-col items-center justify-center"
    >
      <div className="text-4xl text-blue-400 mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="opacity-80 text-sm">{desc}</p>
    </motion.div>
  );
}
