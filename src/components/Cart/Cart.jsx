import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import Looding from "../Looding/Looding";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";

export default function Cart() {
  let { cart, addToCount, removeCartItem, removeAllCartItem, getProductsCart ,numOfCartItems} =
    useContext(CartContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true); // حالة اللودينج

  // **جلب بيانات السلة عند فتح الصفحة**
  useEffect(() => {
    async function fetchCart() {
      await getProductsCart(); // جلب المنتجات
      setLoading(false); // إيقاف اللودينج
    }
    fetchCart();
  }, []);

  // **عرض اللودينج أثناء جلب البيانات فقط**
  if (loading) {
    return <Looding />;
  }

  // **عرض رسالة "السلة فارغة" إذا لم تكن هناك منتجات**
  if (!cart?.data?.products || cart.data.products.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your cart is empty!
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-11">
        {/* الصف الأول */}
        <div className="m-10">
        <div className="flex justify-between w-full">
          <h2 className="text-2xl font-bold">Cart Shop</h2>
          <Link to={'/chickout'}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
            Checkout
          </button>
          </Link>
          
        </div>
      
        {/* الصف الثاني */}
        <div className="flex justify-between w-full col-span-2">
          <p className="text-lg">
            total price: <span className="text-green-500">  {cart.data.totalCartPrice}</span>
          </p>
          <p className="text-lg">
            total number of items: <span className="text-green-500">{numOfCartItems}</span>
          </p>
        </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4"></div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.data.products.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={item.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={item.product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  <h3>{item.product.title}</h3>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={
                        item.count > 1
                          ? () => addToCount(item.product.id, item.count - 1)
                          : () => removeCartItem(item.product.id)
                      }
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                      type="button"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1">
                        {item.count}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        addToCount(item.product.id, item.count + 1)
                      }
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                      type="button"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.price * item.count} $
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removeCartItem(item.product.id)}
                    className="bg-transparent hover:bg-transparent font-medium text-red-600 dark:text-red-500 hover:underline border-t-gray-50 focus:outline-none focus:ring-0"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-6">
          <button
            onClick={removeAllCartItem}
            className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Clear Your Cart
          </button>
        </div>
      </div>
    </>
  );
}
