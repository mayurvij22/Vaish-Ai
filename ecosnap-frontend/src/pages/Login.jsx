import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200">
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">EcoSnap Login</h2>
      <AuthForm type="login" />
    </div>
  </div>
);

export default Login;
