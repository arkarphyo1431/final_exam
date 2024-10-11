import * as React from 'react';

export default function HomeV2() {
  // Include state to handle which tab is active
  const [activeTab, setActiveTab] = React.useState('products');  // Default active tab

  return (
    <main>
      <div className="w-full h-full my-10 mx-auto text-center">
        <h1 className="font-bold text-xl">Stock Management v1.0</h1>
        {/* Navigation Bar */}
        <div className="mt-4">
          <button
            className={`mx-2 px-4 py-2 ${activeTab === 'products' ? 'text-white bg-black' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={`mx-2 px-4 py-2 ${activeTab === 'category' ? 'text-white bg-black' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('category')}
          >
            Category
          </button>
          <button
            className={`mx-2 px-4 py-2 ${activeTab === 'customers' ? 'text-white bg-black' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('customers')}
          >
            Customers
          </button>
        </div>
        {/* Content Display Based on Active Tab */}
        <div className="mt-4">
          {activeTab === 'products' && <p>Manage your products here.</p>}
          {activeTab === 'category' && <p>Manage categories here.</p>}
          {activeTab === 'customers' && <p>Manage customers here.</p>}
        </div>
      </div>
    </main>
  );
}
