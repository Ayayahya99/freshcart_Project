import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { UserContext } from "../../../context/UserContext";
import { CartContext } from "../../../context/CartContext";
import { DarkModeContext } from "../../../context/DarkModeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { UserToken, setUserToken } = useContext(UserContext);
  let { numOfCartItems } = useContext(CartContext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <nav className={`transition-all duration-300 sticky top-0 shadow-md z-50  ${darkMode ? "bg-gray-700 text-white" : "bg-light text-gray-900"} shadow-md px-4 sm:px-8 w-full`}>
      <div className="container mx-auto flex items-center justify-between max-w-screen-xl py-3">
        {/* ✅ اللوجو */}
        <img src={logo} alt="FreshCart Logo" className="w-32 max-w-full " />

        {/* ✅ القائمة الرئيسية */}
        {UserToken && (
          <ul className="hidden md:flex font-semibold space-x-4">
            <li><NavLink className="px-2 py-1 hover:text-green-500" to={"/"}>Home</NavLink></li>
            <li><NavLink className="px-2 py-1 hover:text-green-500" to={"products"}>Products</NavLink></li>
            <li><NavLink className="px-2 py-1 hover:text-green-500" to={"wishlist"}>Wishlist</NavLink></li>
            <li><NavLink className="px-2 py-1 hover:text-green-500" to={"categories"}>Categories</NavLink></li>
            <li><NavLink className="px-2 py-1 hover:text-green-500" to={"brands"}>Brands</NavLink></li>
          </ul>
        )}

        {/* ✅ أزرار التسجيل والخروج */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {/* زر تبديل الدارك مود 🌙 */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded transition-all duration-300 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            {darkMode ? "☀️ " : "🌙"}
          </button>

          {UserToken ? (
            <>
              {/* 🛒 أيقونة السلة */}
              <NavLink to="cart" className="relative px-2 py-1 hover:text-green-500">
                <i className="fas fa-shopping-cart fa-xl"></i>
                {numOfCartItems > 0 && (
                  <span className="absolute top-[-8px] right-[-10px] bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {numOfCartItems}
                  </span>
                )}
              </NavLink>

              {/* 🚪 زر تسجيل الخروج */}
              <span
                onClick={logout}
                className="px-2 py-2 cursor-pointer hover:text-red-500"
              >
                Log Out
              </span>
            </>
          ) : (
            <>
              <NavLink to={"login"} className="px-2 py-2 hover:text-green-500">Login</NavLink>
              <NavLink to={"register"} className="px-2 py-2 hover:text-green-500">Register</NavLink>
            </>
          )}
        </div>

        {/* ✅ زر القائمة في الموبايل */}
        {UserToken && (
          <button
            className="md:hidden border-2 border-green-500 bg-slate-300 p-2 rounded-md flex flex-col justify-between items-center w-8 h-8 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="block w-full h-1 bg-green-500 mb-1"></span>
            <span className="block w-full h-1 bg-green-500 mb-1"></span>
            <span className="block w-full h-1 bg-green-500"></span>
          </button>
        )}
      </div>

      {/* ✅ القائمة المنسدلة في الشاشات الصغيرة */}
      {UserToken && (
        <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-100 dark:bg-gray-800`}>
          <ul className="flex flex-col items-center py-4 space-y-2">
            <li><NavLink className="py-2 hover:text-green-500" to={"/"}>Home</NavLink></li>
            <li><NavLink className="py-2 hover:text-green-500" to={"products"}>Products</NavLink></li>
            <li><NavLink className="py-2 hover:text-green-500" to={"cart"}>Cart</NavLink></li>
            <li><NavLink className="py-2 hover:text-green-500" to={"wishlist"}>Wishlist</NavLink></li>
            <li><NavLink className="py-2 hover:text-green-500" to={"categories"}>Categories</NavLink></li>
            <li><NavLink className="py-2 hover:text-green-500" to={"brands"}>Brands</NavLink></li>

            <div className="my-4 border-t border-gray-300 w-full"></div>

            {/* زر تبديل الدارك مود 🌙 */}
            <li className="py-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </li>

            {/* زر تسجيل الخروج 🚪 */}
            <li className="py-2 text-red-500 cursor-pointer hover:text-red-700">
              <span onClick={logout}>Log Out</span>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
