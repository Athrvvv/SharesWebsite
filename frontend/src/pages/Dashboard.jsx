// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactTyped } from 'react-typed';
import { FaSignOutAlt, FaTimes, FaCheck } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const decoded = jwtDecode(token);
      if (decoded.id !== userId) {
        navigate('/login');
      } else {
        setUser(decoded);
      }
    } catch (err) {
      navigate('/login');
    }
  }, [navigate, userId]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-black text-white px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Welcome to your dashboard
        <ToastContainer position="top-center" />
      </motion.h1>

      {user && (
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg md:text-xl text-center">
            Logged in as{' '}
            <ReactTyped
              strings={[`${user.firstName} ${user.middleName || ''} ${user.lastName}`.trim()]}
              typeSpeed={50}
              showCursor={true}
            />
          </p>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg font-semibold mb-4">Are you sure you want to logout?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition"
                >
                  <FaCheck /> Yes
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full flex items-center gap-2 transition"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
