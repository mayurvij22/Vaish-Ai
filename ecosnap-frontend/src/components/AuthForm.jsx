import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const isLogin = type === 'login';

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const { data } = await axios.post(import.meta.env.VITE_API_URL + endpoint, formData);

      if (isLogin) {
        localStorage.setItem('token', data.token);
        toast.success('Logged in successfully!');
        navigate('/');
      } else {
        toast.success('Account created! Please log in.');
        navigate('/login');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Something went wrong';
      toast.error(errorMsg);

      // Auto-redirect to register if user not found during login
      if (isLogin && errorMsg.toLowerCase().includes('not found')) {
        setTimeout(() => navigate('/register'), 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-green-500"
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-green-500"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-green-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
      >
        {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
      </button>

      <p className="text-center text-sm text-gray-600">
        {isLogin ? (
          <>
            Don’t have an account?{' '}
            <span
              className="text-green-700 hover:underline cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Register Now
            </span>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <span
              className="text-green-700 hover:underline cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login Instead
            </span>
          </>
        )}
      </p>
    </form>
  );
};

export default AuthForm;
