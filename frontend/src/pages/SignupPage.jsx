// SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { firstName, lastName, email, phoneNumber, password } = form;
    const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/;
    const phoneRegex = /^[0-9]{10}$/;
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      toast.error('All required fields must be filled');
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (!phoneRegex.test(phoneNumber)) {
      toast.error('Phone number must be 10 digits');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await axios.post('/api/auth/signup', form);
      toast.success(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <ToastContainer />
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Sign Up
        </motion.h2>
        <div className="grid grid-cols-1 gap-4">
          {['firstName', 'middleName', 'lastName', 'phoneNumber', 'email', 'dob', 'password'].map((field, i) => (
            <motion.input
              key={field}
              type={field === 'dob' ? 'date' : field === 'password' ? 'password' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field === 'dob' ? '' : field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1') + (['firstName','lastName','email','phoneNumber','password'].includes(field) ? '*' : '')}
              className="input"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            />
          ))}
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Sign Up
          </motion.button>
          <motion.p
            className="text-center text-sm mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Already a user?{' '}
            <span onClick={() => navigate('/login')} className="text-blue-600 cursor-pointer">
              Login
            </span>
          </motion.p>
          <motion.button
  onClick={() => navigate('/')}
  className="mt-4 text-sm text-gray-600 hover:text-blue-600 underline transition"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  ← Back to Home
</motion.button>

        </div>
      </motion.form>
    </div>
  );
}
