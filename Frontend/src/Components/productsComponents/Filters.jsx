import React, { useState } from 'react';
import { FaDollarSign, FaTag, FaStar } from 'react-icons/fa';

const Filters = ({ setPriceFilter }) => {
  const [selectedPrice, setSelectedPrice] = useState('');

  const handlePriceChange = (priceRange, value) => {
    setSelectedPrice(value);
    setPriceFilter(priceRange);
  };

  const clearFilters = () => {
    setSelectedPrice('');
    setPriceFilter({});
  };

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Price Filter */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <FaDollarSign className="w-4 h-4 text-gray-500" />
          <h4 className="font-medium text-gray-900">Price Range</h4>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Under $50', value: 'under-50', range: { max: 50 } },
            { label: '$50 - $100', value: '50-100', range: { min: 50, max: 100 } },
            { label: '$100 - $200', value: '100-200', range: { min: 100, max: 200 } },
            { label: 'Above $200', value: 'above-200', range: { min: 200 } }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="price"
                value={option.value}
                checked={selectedPrice === option.value}
                onChange={() => handlePriceChange(option.range, option.value)}
                className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>


    </div>
  );
};

export default Filters;
