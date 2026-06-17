// // import React, { useState, useEffect } from 'react';
// // import { Package, ChevronRight, Download } from 'lucide-react';
// // import axiosInstance from '../utils/axiosInstance'; // API call ke liye

// // export default function UserOrders() {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // ⚡ Database se Orders mangwana
// //   useEffect(() => {
// //     const fetchMyOrders = async () => {
// //       try {
// //         // Backend ka route jahan se user ke orders aayenge
// //         const { data } = await axiosInstance.get('/orders/my-orders'); 
// //         if (data.success) {
// //           setOrders(data.orders);
// //         }
// //       } catch (error) {
// //         console.error("Orders fetch karne me error:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchMyOrders();
// //   }, []);

// //   if (loading) {
// //     return <div className="p-8 text-gray-500">Loading your luxury collection...</div>;
// //   }

// //   return (
// //     <div className="p-8 bg-white min-h-screen text-black">
// //       <h2 className="text-2xl font-serif text-black mb-8 border-b border-gray-100 pb-4">
// //         My Orders
// //       </h2>

// //       {/* Agar koi order nahi hai */}
// //       {orders.length === 0 ? (
// //         <div className="border border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col items-center justify-center text-center">
// //           <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-4">
// //             <Package size={24} className="text-gray-400" />
// //           </div>
// //           <h3 className="text-lg font-bold text-gray-800 mb-2">No Orders Yet</h3>
// //           <p className="text-sm text-gray-500 max-w-sm mb-6">
// //             Looks like you haven't made your first premium purchase yet.
// //           </p>
// //           <button className="bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition">
// //             Start Shopping
// //           </button>
// //         </div>
// //       ) : (
// //         // Agar orders hain toh list dikhao
// //         <div className="space-y-6">
// //           {orders.map((order) => (
// //             <div key={order._id} className="border border-gray-200 rounded-sm bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
// //               {/* Order Header */}
// //               <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
// //                 <div className="flex gap-8">
// //                   <div>
// //                     <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Order Date</p>
// //                     <p className="text-sm text-gray-800 font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Amount</p>
// //                     <p className="text-sm text-gray-800 font-medium">₹{order.totalPrice}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Order ID</p>
// //                     <p className="text-sm text-gray-800 font-medium">#{order._id.substring(0, 8).toUpperCase()}</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Order Items */}
// //               <div className="p-6">
// //                 <div className="mb-4">
// //                   <span className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold border rounded-sm ${
// //                     order.orderStatus === 'Delivered' ? 'text-green-600 bg-green-50 border-green-200' : 'text-yellow-600 bg-yellow-50 border-yellow-200'
// //                   }`}>
// //                     {order.orderStatus}
// //                   </span>
// //                 </div>

// //                 {order.orderItems.map((item, index) => (
// //                   <div key={index} className="flex items-start gap-6 mt-4">
// //                     <div className="w-24 h-24 bg-gray-100 flex-shrink-0 border border-gray-200">
// //                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
// //                     </div>
// //                     <div className="flex-1">
// //                       <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
// //                       <p className="text-sm font-medium text-gray-800 mt-1">Qty: {item.quantity} <span className="mx-2 text-gray-300">|</span> ₹{item.price}</p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from 'react';
// import { Package, CreditCard } from 'lucide-react';
// import axiosInstance from '../utils/axiosInstance'; 

// export default function UserOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ⚡ Database se asli orders fetch karna
//   useEffect(() => {
//     const fetchMyOrders = async () => {
//       try {
//         const { data } = await axiosInstance.get('/orders/my-orders'); 
//         if (data.success) {
//           setOrders(data.orders);
//         }
//       } catch (error) {
//         console.error("Orders fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMyOrders();
//   }, []);

//   if (loading) {
//     return <div className="p-8 text-gray-500 font-serif">Loading your luxury collection...</div>;
//   }

//   return (
//     <div className="p-8 bg-white min-h-screen text-black">
//       <h2 className="text-2xl font-serif text-black mb-8 border-b border-gray-100 pb-4">
//         My Orders
//       </h2>

//       {orders.length === 0 ? (
//         <div className="border border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col items-center justify-center text-center shadow-sm">
//           <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-4">
//             <Package size={24} className="text-gray-400" />
//           </div>
//           <h3 className="text-lg font-bold text-gray-800 mb-2">No Orders Yet</h3>
//           <p className="text-sm text-gray-500 max-w-sm mb-6">
//             Looks like you haven't made your first premium purchase yet.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div key={order._id} className="border border-gray-200 rounded-sm bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
//               {/* Order Header */}
//               <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-wrap gap-8">
//                 <div>
//                   <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Order Date</p>
//                   <p className="text-sm text-gray-800 font-medium">
//                     {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Amount</p>
//                   <p className="text-sm text-gray-800 font-medium">₹{order.totalAmount}</p>
//                 </div>
//                 <div>
//                   <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Order ID</p>
//                   <p className="text-sm text-gray-800 font-medium">#{order._id.substring(0, 8).toUpperCase()}</p>
//                 </div>
//               </div>

//               {/* Order Items */}
//               <div className="p-6">
//                 <div className="mb-4">
//                   <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold border rounded-sm text-yellow-600 bg-yellow-50 border-yellow-200">
//                     {order.orderStatus || 'Processing'}
//                   </span>
//                 </div>

//                 {order.orderItems.map((item, index) => (
//                   <div key={index} className="flex items-start gap-6 mt-4">
//                     <div className="w-24 h-24 bg-gray-100 flex-shrink-0 border border-gray-200">
//                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
//                       <p className="text-sm font-medium text-gray-800 mt-1">
//                         Qty: {item.quantity} <span className="mx-2 text-gray-300">|</span> ₹{item.price}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { Package, CreditCard } from 'lucide-react';
// import { Link } from 'react-router-dom'; // ⚡ NAYA ADD KIYA: Page change karne ke liye
// import axiosInstance from '../utils/axiosInstance'; 

// export default function UserOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ⚡ Database se asli orders fetch karna
//   useEffect(() => {
//     const fetchMyOrders = async () => {
//       try {
//         const { data } = await axiosInstance.get('/orders/my-orders'); 
//         if (data.success) {
//           setOrders(data.orders);
//         }
//       } catch (error) {
//         console.error("Orders fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMyOrders();
//   }, []);

//   if (loading) {
//     return <div className="p-8 text-gray-500 font-serif">Loading your luxury collection...</div>;
//   }

//   return (
//     <div className="p-8 bg-white min-h-screen text-black">
//       <h2 className="text-2xl font-serif text-black mb-8 border-b border-gray-100 pb-4">
//         My Orders
//       </h2>

//       {orders.length === 0 ? (
//         <div className="border border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col items-center justify-center text-center shadow-sm">
//           <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-4">
//             <Package size={24} className="text-gray-400" />
//           </div>
//           <h3 className="text-lg font-bold text-gray-800 mb-2">No Orders Yet</h3>
//           <p className="text-sm text-gray-500 max-w-sm mb-6">
//             Looks like you haven't made your first premium purchase yet.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div key={order._id} className="border border-gray-200 rounded-sm bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
//               {/* Order Header */}
//               <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-wrap gap-8">
//                 <div>
//                   <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Order Date</p>
//                   <p className="text-sm text-gray-800 font-medium">
//                     {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Amount</p>
//                   <p className="text-sm text-gray-800 font-medium">₹{order.totalAmount}</p>
//                 </div>
//                 <div>
//                   <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Order ID</p>
//                   <p className="text-sm text-gray-800 font-medium">#{order._id.substring(0, 8).toUpperCase()}</p>
//                 </div>
//               </div>

//               {/* Order Items */}
//               <div className="p-6">
//                 <div className="mb-4">
//                   <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold border rounded-sm text-yellow-600 bg-yellow-50 border-yellow-200">
//                     {order.orderStatus || 'Processing'}
//                   </span>
//                 </div>

//                 {order.orderItems.map((item, index) => (
//                   <div key={index} className="flex items-start gap-6 mt-4">
//                     <div className="w-24 h-24 bg-gray-100 flex-shrink-0 border border-gray-200">
//                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
//                       <p className="text-sm font-medium text-gray-800 mt-1">
//                         Qty: {item.quantity} <span className="mx-2 text-gray-300">|</span> ₹{item.price}
//                       </p>
//                     </div>
//                   </div>
//                 ))}

//                 {/* ⚡ NAYA ADD KIYA: Track Order Button ⚡ */}
//                 <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
//                   <Link 
//                     to={`/profile/order/${order._id}`} 
//                     className="bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition shadow-sm"
//                   >
//                     View Details & Track
//                   </Link>
//                 </div>
                
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import axiosInstance from '../utils/axiosInstance'; 

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const { data } = await axiosInstance.get('/orders/my-orders'); 
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Orders fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  if (loading) {
    return <div className="p-8 text-gray-500 font-serif">Loading your luxury collection...</div>;
  }

  return (
    <div className="p-8 bg-white min-h-screen text-black">
      <h2 className="text-2xl font-serif text-black mb-8 border-b border-gray-100 pb-4">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <div className="border border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-4">
            <Package size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">No Orders Yet</h3>
          <p className="text-sm text-gray-500 max-w-sm mb-6">
            Looks like you haven't made your first premium purchase yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-sm bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
              {/* Order Header */}
              <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-wrap gap-8">
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Order Date</p>
                  <p className="text-sm text-gray-800 font-medium">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Amount</p>
                  <p className="text-sm text-gray-800 font-medium">₹{order.totalAmount}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Order ID</p>
                  <p className="text-sm text-gray-800 font-medium">#{order._id.substring(0, 8).toUpperCase()}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                
                {/* ⚡ STATUS AUR BUTTON AB EK SAATH HAIN ⚡ */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold border rounded-sm text-yellow-600 bg-yellow-50 border-yellow-200">
                    {order.orderStatus || 'Processing'}
                  </span>
                  
                  <Link 
                    to={`/profile/order/${order._id}`} 
                    className="text-[10px] font-bold uppercase tracking-widest text-black border-b border-black hover:text-gray-600 hover:border-gray-600 transition"
                  >
                    View Details
                  </Link>
                </div>

                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-6 mt-4">
                    <div className="w-24 h-24 bg-gray-100 flex-shrink-0 border border-gray-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                      <p className="text-sm font-medium text-gray-800 mt-1">
                        Qty: {item.quantity} <span className="mx-2 text-gray-300">|</span> ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}