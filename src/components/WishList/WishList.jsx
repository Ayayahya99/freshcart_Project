import React, { useContext, useEffect } from "react";
import style from "./WishList.module.css";
import { WishListContext } from "../../../context/WishListContext";
import Looding from "../Looding/Looding";
import { CartContext } from "../../../context/CartContext";
import { Trash2 } from "lucide-react";
import { DarkModeContext } from "../../../context/DarkModeContext";
export default function WishList() {
  const { getItemToWishList, wishlist, removeWishListItem } =
    useContext(WishListContext);
  const { darkMode } = useContext(DarkModeContext);
  let { addProductToCart } = useContext(CartContext);
  useEffect(() => {
    getItemToWishList();
  }, []);

  // // في حالة تحميل البيانات
  if (!wishlist) {
    return <Looding />;
  }

  // إذا كانت القائمة فارغة
  if (wishlist.length === 0) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } p-4`}
      >
        <h2 className="text-2xl font-semibold">Your cart is empty!</h2>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3"><span className="sr-only">Image</span></th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead> */}
          <tbody>
            <div
              className={`text-4xl font-semibold${
                darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
              } p-4`}
            >
              My Wish List
            </div>
            {Array.isArray(wishlist) && wishlist.length > 0 ? (
              wishlist.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-4">
                      {/* الصورة */}
                      <div>
                        <img
                          src={item.imageCover}
                          alt={item.title}
                          className="w-16 md:w-32 max-w-full max-h-full"
                        />
                      </div>

                      {/* العنوان، السعر، وزر الإزالة */}
                      <div className="flex flex-col space-y-1">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </span>

                        <span className="font-semibold text-main dark:text-white">
                          {item.price} $
                        </span>

                        <span
                          onClick={() => removeWishListItem(item.id)}
                          className="flex items-center space-x-1 text-red-600 hover:text-red-800 cursor-pointer transition duration-300"
                        >
                          <Trash2 size={20} />
                          <span>Remove</span>
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 ">
                    <button
                      onClick={() => addProductToCart(item.id)}
                      className="btn w-48 "
                    >
                      Add To Cart
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p>🚀 لم تقم بإضافة أي منتجات إلى قائمة الأمنيات بعد!</p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
