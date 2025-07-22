import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Filters from './Filters';
import Cart from './Cart';
import { FaShoppingCart, FaThLarge, FaList, FaFilter } from 'react-icons/fa';

const Products = ({ setPriceFilter, products }) => {
  const [showCart, setShowCart] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="bg-gray-50 min-h-screen">


      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className={`grid gap-6 ${showFilters ? 'grid-cols-[320px_1fr]' : 'grid-cols-1'}`}>


          {/* Filters Sidebar */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-fit sticky top-6">
              <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                  <button
                    onClick={() => setShowCart(true)}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    <FaShoppingCart className="w-4 h-4" />
                    <span>Cart</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <Filters setPriceFilter={setPriceFilter} />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Products Header */}
            <div className="bg-white  px-8 py-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {products.length} {products.length === 1 ? 'Product' : 'Products'}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Showing all available items
                    </p>
                  </div>

                  {/* Enhanced Stats */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-700 text-sm font-medium">
                        {products.filter(p => p.sku > 0).length} Available
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-red-700 text-sm font-medium">
                        {products.filter(p => p.sku === 0).length} Sold Out
                      </span>
                    </div>
                  </div>
                </div>
                {/* Enhanced View Controls */}
                <div className="flex items-center space-x-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">View:</span>
                    <div className="flex border border-gray-200 rounded-md">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 transition-colors ${viewMode === 'grid'
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                          }`}
                        title="Grid View"
                      >
                        <FaThLarge className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 transition-colors ${viewMode === 'list'
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                          }`}
                        title="List View"
                      >
                        <FaList className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Filters Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md border transition-colors ${showFilters
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                  >
                    <FaFilter className="w-4 h-4" />
                    <span>Filters</span>
                  </button>

                  {/* Cart Button */}
                  <button
                    onClick={() => setShowCart(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <FaShoppingCart className="w-4 h-4" />
                    <span>Cart</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Products Content */}
            <div className="p-6">

              {/* Products Display */}
              <div className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
                }`}>
                {products.map((product, index) => (
                  <ProductCard
                    key={product._id || index}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {products.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-gray-300 text-8xl mb-6">🛍️</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
                  <p className="text-gray-600 text-lg mb-6">Try adjusting your filters or search criteria.</p>
                  <button
                    onClick={() => setShowFilters(true)}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    Show Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Cart Modal */}
          {showCart && (
            <>
              <div
                className="fixed inset-0  bg-opacity-60 z-40 backdrop-blur-sm"
                onClick={() => setShowCart(false)}
              />
              <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">Shopping Cart</h3>
                      <p className="text-blue-100 text-sm mt-1">Review your items</p>
                    </div>
                    <button
                      onClick={() => setShowCart(false)}
                      className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-20 rounded-lg"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <Cart />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
