import React from 'react';
import UploadForm from '../components/UploadForm';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-green-700 drop-shadow-md">🌱 EcoSnap Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow transition duration-300"
        >
          Logout
        </button>
      </header>

      {/* Upload Form */}
      <main>
        <UploadForm />
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        Built with 💚 for a cleaner planet 🌍
      </footer>
    </div>
  );
};

export default Home;
