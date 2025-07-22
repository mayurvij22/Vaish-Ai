import React, { useState } from 'react';
import API from '../utils/api';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await API.post('/api/ai/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-lg border border-green-100">
      <h2 className="text-xl font-bold text-green-700 mb-4 text-center">EcoSnap Waste Classifier</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-4 px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded shadow transition-all duration-300"
          type="submit"
        >
          Upload & Analyze
        </button>
      </form>

      {result && (
        <div className="mt-6 text-center">
          <img
            src={result.imageUrl}
            alt="Uploaded waste"
            className="h-40 w-full object-cover rounded mb-4 shadow-md"
          />
          <p className="text-sm text-gray-700"><strong>Material:</strong> {result.material}</p>
          <p className="text-sm text-green-700 mt-1"><strong>Eco Tip:</strong> {result.ecoTip}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
