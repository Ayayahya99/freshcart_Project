import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Allorders() {
  const [orders, setOrders] = useState([]); // هنخزن الوردرات  هنا  

  const token = localStorage.getItem("userToken"); // بعد كده  نجيب  لتوكن  من اللوكل  ستريج
  const decodedJWTToken = jwtDecode(token); // بعد كده  نستخدم  توكن  لجيب  الايدي
  const userID = decodedJWTToken.id; //user id 

  async function getUserOrders(userID) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`,
        { headers: { token } }
      );
      setOrders(data || []); //  عشان  بس  الداتا بتتاخر على ما ترجع  فهنا  بنتاكد انها مش  undefined
      console.log(data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  }


  useEffect(() => {
    getUserOrders(userID);

  }, []);

  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🛒 Your Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-transform transform hover:scale-[1.02] duration-300"
            >
              {/* ✅ Order Header */}
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-blue-600">
                  Order ID: {order._id}
                </h2>
                <p
                  className={`text-sm font-medium ${
                    order.isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.isPaid ? "✅ Paid" : "❌ Not Paid"}
                </p>
              </div>

              
              {/* ✅ Order Details */}
              <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-800 text-lg font-semibold">
                  🏷️ Total: {order.totalOrderPrice} EGP
                </p>
                <p className="text-gray-700 font-medium">💳 Payment: {order.paymentMethodType}</p>
              </div>

              {/* ✅ Products Section */}
              <h3 className="text-lg font-medium mt-4 mb-2">🛍️ Products:</h3>
              <ul className="space-y-3">
                {order.cartItems.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-200"
                  >
                    <img
                      src={item.product?.imageCover}
                      alt={item.product?.title}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-lg">{item.product?.title || "Unknown Product"}</p>
                      <p className="text-gray-600">💰 Price: {item.price} EGP</p>
                      <p className="text-gray-500">🔢 Quantity: {item.count}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
