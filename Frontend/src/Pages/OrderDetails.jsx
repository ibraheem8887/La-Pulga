import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/shared/Footer';
import ConfirmationOrder from '../Components/orderComponents/confirmationOrder'; 
import { patchItemSku,fetchItemById } from '../Services/Products/products'; // or patchItem if more general
import {addOrder} from '../Services/Order/order'
import { loadStripe }  from '@stripe/stripe-js'
import api from '../Services/api';
import {  useCart } from '../Contexts/CartContext';
const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
const {cartData} = useCart();
  useEffect(() => {
    const storedOrder = localStorage.getItem('latestOrder');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  const handleConfirmOrder = async () => {
     
           try {
            await addOrder(order);
           
            // Update each product's SKU
            if (order?.orderItems?.length > 0) {
              await Promise.all(
                order.orderItems.map(async (item) => {
                  const productId = item.product;
      
                  const product = await fetchItemById('products', productId);
      
                  if (!product?.sku) {
                    console.warn('SKU missing for product:', productId);
                    return;
                  }
      
                  const newSku = product.sku - item.quantity;
      
                  await patchItemSku(productId, newSku);
                  setShowPopup(true);
                })
              );
            }
           } catch (error) {
             console.error(error);
           }
      
            // Save order
            
        
  };


  const makePayment = async (params) => {
     const stripe = await loadStripe("pk_test_51RjaCc2YCFbZkcFKmUdr2YIAXyFBhbuDAE6zqolgXcPZWzFFtzJPZzmQz7kilQVGctWNiOQK3vGKsKpWn1ZCEYAM00uVtvLvxg")
     const response = await api.post('/orders/create-checkout-session', {orderItems:cartData});

     const session = response.data;
     
     const result = stripe.redirectToCheckout({
      sessionId:session.id
     })
     if (order?.orderItems?.length > 0 && session?.line_items?.data?.length > 0) {
      const stripeLineItems = session.line_items.data;
    
      await Promise.all(
        order.orderItems.map(async (item) => {
          const matchingStripeItem = stripeLineItems.find(
            (stripeItem) => stripeItem.description === item.name // or use metadata.productId
          );
    
          if (matchingStripeItem) {
            const oldQuantity = item.quantity;
            const newQuantity = matchingStripeItem.quantity;
    
            const stockChange = item.sku - newQuantity;
    
            console.log(`🛒 ${item.name}: old qty = ${oldQuantity}, final qty = ${newQuantity}, stock left = ${stockChange}`);
    
            // Optional: update product stock in DB
            // await Product.findByIdAndUpdate(item.product, {
            //   $inc: { stock: -newQuantity },
            // });
          }
        })
      );
    }
    
     handleConfirmOrder(order);
     if((await result).error)
     {
      console.error((await result).error);
      
     }
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        No order found.
      </div>
    );
  }

  return (
    <>
      <header className="bg-black text-white px-6 py-4 shadow-md mb-10">
        <h1
          onClick={() => navigate('/')}
          className="text-2xl font-bold cursor-pointer hover:text-gray-300 transition-all"
        >
          LA Pulga
        </h1>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8 bg-white rounded-xl shadow-lg space-y-8 border">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🧾 Order Details</h2>
        </div>

        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Customer Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold">{order.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{order.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold">{order.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Shipping Address</p>
              <p className="font-semibold">{order.address}</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">📦 Ordered Items</h3>
          <div className="divide-y rounded border border-gray-200 overflow-hidden">
            {order.orderItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm text-gray-700">$ {item.price}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-xl font-bold text-gray-800">
            Total: $ {order.totalPrice.toFixed(2)}
          </p>
          <button
            onClick={makePayment}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            PAY $ {order.totalPrice.toFixed(2)}
          </button>
        </div>
      </div>

      {/* {showPopup && <ConfirmationOrder  onClose={() => setShowPopup(false)} />} */}

      <Footer />
    </>
  );
};

export default OrderDetails;
