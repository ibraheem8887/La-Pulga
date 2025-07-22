import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchItemById } from '../../Services/Products/products';
import { useCart } from '../../Contexts/CartContext';
import { FaCartPlus, FaTrashAlt, FaEye, FaStar } from 'react-icons/fa';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const { removeFromCart, isInCart, addToCart } = useCart();



  useEffect(() => {
    const fetchCategory = async () => {
      const cat = await fetchItemById('category', product.category);
      setCategoryName(cat);
    };
    fetchCategory();
  }, [product.category]);

  const getCategoryStyle = (name) => {
    switch (name?.toLowerCase()) {
      case 'mens':
        return 'bg-gradient-to-r from-blue-800 to-blue-600 text-white';
      case 'womens':
        return 'bg-gradient-to-r from-rose-500 to-pink-400 text-white';
      case 'kids':
        return 'bg-gradient-to-r from-green-500 to-lime-400 text-white';
      default:
        return 'bg-gray-300 text-gray-800';
    }
  };

  const goToDetails = () => {
    navigate(`/displayInfo/${product._id}`);
  };

  // Grid View Component
  if (viewMode === 'grid') {
    return (
      <div
        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <div
            onClick={goToDetails}
            className="h-64 w-full bg-gray-100 cursor-pointer"
          >
            <img
              src={product.images[0] || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Overlay Actions */}
          <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
            <button
              onClick={goToDetails}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <FaEye className="w-4 h-4" />
              <span>Quick View</span>
            </button>
          </div>

          {/* Category Badge */}
          {categoryName.name && (
            <div className="absolute top-3 left-3">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryStyle(categoryName.name)}`}>
                {categoryName.name}
              </span>
            </div>
          )}

          {/* Stock Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.sku > 0
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
              }`}>
              {product.sku > 0 ? 'In Stock' : 'Sold Out'}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          <div onClick={goToDetails} className="cursor-pointer mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-4 h-4 text-yellow-400" />
              ))}
              <span className="text-sm text-gray-500 ml-2">(4.5)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Button */}
          {isInCart(product) ? (
            <button
              onClick={() => removeFromCart(product)}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              <FaTrashAlt className="w-4 h-4" />
              <span>Remove from Cart</span>
            </button>
          ) : (
            <button
              disabled={product.sku === 0}
              onClick={() => addToCart(product)}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <FaCartPlus className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // List View Component
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
      <div className="flex space-x-6">
        {/* Image */}
        <div
          onClick={goToDetails}
          className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
        >
          <img
            src={product.images[0] || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div onClick={goToDetails} className="cursor-pointer">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {/* Category and Stock */}
                <div className="flex items-center space-x-3 mb-3">
                  {categoryName.name && (
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryStyle(categoryName.name)}`}>
                      {categoryName.name}
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.sku > 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }`}>
                    {product.sku > 0 ? 'In Stock' : 'Sold Out'}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">(4.5)</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={goToDetails}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                  >
                    <FaEye className="w-4 h-4" />
                    <span>View</span>
                  </button>

                  {isInCart(product) ? (
                    <button
                      onClick={() => removeFromCart(product)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                    >
                      <FaTrashAlt className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  ) : (
                    <button
                      disabled={product.sku === 0}
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                      <FaCartPlus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
