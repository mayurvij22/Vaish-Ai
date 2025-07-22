import React from 'react';
import AuthForm from '../components/AuthForm';

const Register = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-lime-200">
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-2">Create EcoSnap Account</h2>
      <p className="text-sm text-center text-gray-600 mb-6">
        Start tracking your eco-impact and reduce waste 🌍
      </p>
      <AuthForm type="register" />
      <div className="mt-6 text-center">
       
      </div>
    </div>
  </div>
);

export default Register;
