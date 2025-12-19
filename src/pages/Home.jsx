import React from 'react';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to Our Website!</h1>
      <p className="text-lg text-gray-700 mb-6">
        This is a dummy home page. You can add your content, features, or components here.
      </p>
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Get Started
        </button>
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default Home;
