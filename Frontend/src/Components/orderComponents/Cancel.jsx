import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Cancel = () => {
  const [params] = useSearchParams();

//   useEffect(() => {
//     const confirmOrder = async () => {
//       const sessionId = params.get('session_id');
//       if (!sessionId) return;

//       try {
//         const { data } = await axios.post('http://localhost:3000/orders/stripe/confirm', { sessionId });

//         // 1. Update SKU
//         await Promise.all(
//           data.orderItems.map(async (item) => {
//             const product = await axios.get(`http://localhost:3000/products/${item.product}`);
//             const newSku = product.data.sku - item.quantity;

//             await axios.patch(`http://localhost:3000/products/${item.product}/sku`, { sku: newSku });
//           })
//         );

//         // x2. Show confirmation
//         alert("Order Confirmed!");
//       } catch (error) {
//         console.error("❌ Error confirming order:", error);
//       }
//     };

//     confirmOrder();
//   }, []);

  return <h1>✅ Payment UNSuccessful</h1>;
};

export default Cancel;
