import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchItemById } from '../../Services/Products/products';
import { useCart } from '../../Contexts/CartContext';
import { FaCartPlus,FaTrashAlt } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const { removeFromCart,isInCart,addToCart } = useCart();

  

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

  return (
    <div  className="w-full max-w-sm bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      
      <div onClick={goToDetails} className="h-64 w-full bg-gray-100 overflow-hidden">
        <img
          src={product.images[0] || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div onClick={goToDetails} className="p-4 space-y-2 text-center">
        {categoryName.name && (
          <span className={`px-4 py-1 text-xs font-semibold rounded-full shadow ${getCategoryStyle(categoryName.name)}`}>
            {categoryName.name}
          </span>
        )}
        <h3 className="text-lg font-semibold text-gray-900 font-serif">{product.name}</h3>
        <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
        <p className={`text-sm font-medium ${product.sku > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.sku > 0 ? 'In Stock' : 'Sold Out'}
        </p>
       
       
      </div>
      <div className=''>
      
      {isInCart(product) ? (
  <button
    onClick={() => removeFromCart(product)}
    className="w-full flex items-center justify-center gap-2 py-2 rounded-2xl bg-red-600 text-white text-sm font-medium hover:bg-red-800 transition-all duration-300"
  >
    <FaTrashAlt /> Remove from Cart
  </button>
) : (
  <button
  disabled={product.sku === 0 }
    onClick={() => addToCart(product)}
    className="w-full flex items-center justify-center gap-2 py-2 rounded-2xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-all duration-300"
  >
    <FaCartPlus />
    Add to Cart
  </button>
)}

</div>
    </div>
  );
};

export default ProductCard;
