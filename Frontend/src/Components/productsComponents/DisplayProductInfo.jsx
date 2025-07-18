import React, { useEffect, useState } from 'react';
import { fetchItemById } from '../../Services/Products/products';
import { useParams } from 'react-router-dom';
import { useCart } from '../../Contexts/CartContext';
import Cart from './Cart';
import { FaCartPlus } from 'react-icons/fa';

const DisplayProductInfo = () => {
  const { id } = useParams();
  const {handleDecrease,handleIncrease, addToCart, isInCart, removeFromCart,cartData } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const itemInCart = cartData.find(item => item._id === product._id);
  const quantity = itemInCart?.quantity || 0;
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchItemById('products', id);
        setProduct(data);
        if (data?.images?.length > 0) {
          setMainImage(data.images[0]);
        }
        if (data?.category) {
          const categoryRes = await fetchItemById('category', data.category);
          setCategoryName(categoryRes.name);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <div className="min-h-screen bg-white  text-black px-4 py-10 md:px-16 lg:px-24 font-sans relative">
        <button
          className="mb-8 inline-flex items-center text-sm text-blue-600 hover:underline"
          onClick={() => window.history.back()}
        >
          ← Back to Products
        </button>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Info Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <p className="text-sm text-gray-600">
              Category: <span className="font-medium text-black">{categoryName}</span>
            </p>

            <p className="text-gray-700">{product.description}</p>

            <p className="text-2xl font-semibold text-black">
              Price: $ {product.price?.toFixed(2)}
            </p>

            <p className="text-sm">
              Availability:{' '}
              <span
                className={`font-medium ${product.sku ? 'text-green-600' : 'text-red-600'
                  }`}
              >
                {product.sku ? 'In Stock' : 'Out of Stock'}
              </span>
            </p>

            {/* Thumbnails */}
            {product.images?.length > 0 && (
              <div className="flex space-x-3 pt-3">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`thumb-${i}`}
                    className={`w-16 h-16 object-contain border-2 rounded-md cursor-pointer transition-all duration-200 ${img === mainImage ? 'border-blue-600' : 'border-gray-300'
                      }`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            )}

            <div className="flex space-x-4 pt-4">

            <div className="flex items-center gap-4">
  <button
    
    className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg shadow-sm"
    onClick={()=>handleDecrease(product)}
  >
    -
  </button>

  <p className="w-6 text-center">{quantity}</p>

  <button
    disabled={product.sku === 0}
    className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow-sm"
    onClick={()=>handleIncrease(product)}
  >
    +
  </button>
</div>

              {!showCart && (
                <button
                  onClick={() => setShowCart(true)}
                  className="bg-gray-800 hover:bg-gray-900 transition text-white px-6 py-3 rounded-lg shadow-sm"
                >
                  View Cart 🧺
                </button>
              )}
            </div>
          </div>

          {/* Main Image */}
          <div className="border-l pl-4 flex items-center justify-center h-112 w-112 rounded-xl">
            <img
              src={
                mainImage ||
                'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
              }
              alt="Main Product"
              className="max-h-112 max-w-112 object-contain"
            />
          </div>
        </div>

        {/* Cart Modal */}
        {showCart && (
          <>
            <div
              className="fixed inset-0  bg-opacity-40 z-40"
              onClick={() => setShowCart(false)}
            />
            <div className="fixed right-0 bg-white top-0 h-full w-full sm:w-[400px] shadow-lg z-50 p-4 overflow-y-auto border rounded">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Close ✖
                </button>
              </div>
              <Cart />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DisplayProductInfo;
