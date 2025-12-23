import React from 'react';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Admin Dashboard
      </h1>
      <p className="text-gray-600 mb-6">
        Manage users, products, orders, and system settings
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500 text-sm">Total Users</h2>
          <p className="text-2xl font-bold text-blue-600">1,245</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500 text-sm">Total Orders</h2>
          <p className="text-2xl font-bold text-green-600">320</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500 text-sm">Revenue</h2>
          <p className="text-2xl font-bold text-purple-600">$8,540</p>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add New User
          </button>

          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Add Product
          </button>

          <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
            View Reports
          </button>
        </div>
      </div>

    </div>
  );
}

export default Home;
