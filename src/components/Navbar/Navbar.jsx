import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { UserContext } from "../../../context/UserContext";
import { CartContext } from "../../../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // حالة القائمة المنسدلة
  let { UserToken ,setUserToken } = useContext(UserContext);
  let { cart ,numOfCartItems} = useContext(CartContext);
  let navigate =useNavigate()

  // اللوج  اوت   بنحتاج  تلت   حاجات 
  // 1-فضي ال locall storage
  // 2-فضي ال  context
  // رجعني صفحه اللوجين اوالريجيستر 
  function logout() {

localStorage.removeItem("userToken");
setUserToken(null);
navigate("/login")


    
  }


  return (
    <>
      <nav className="bg-gray-200 shadow shadow-gray-300 px-4 sm:px-8 w-full overflow-x-hidden">
        <div className="container mx-auto flex items-center justify-between max-w-screen-xl">
          {/* ✅ اللوجو (ثابت في مكانه) */}
          <img src={logo} alt="FreshCart Logo" className="w-32 max-w-full" />

          {/* ✅ القائمة الرئيسية (تظهر فقط إذا كان المستخدم مسجل الدخول) */}
          {UserToken && (
            <div className="flex gap-4 flex-grow">
              <ul className="hidden md:flex font-semibold space-x-4">
                <li className="px-2 py-1 hover:text-main">
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li className="px-2 py-1 hover:text-main">
                  <NavLink to={"products"}>Products</NavLink>
                </li>
             
                <li className="px-2 py-1 hover:text-main">
                  <NavLink to={"wishlist"}>Wishlist</NavLink>
                </li>
                <li className="px-2 py-1 hover:text-main">
                  <NavLink to={"categories"}>Categories</NavLink>
                </li>
                <li className="px-2 py-1 hover:text-main">
                  <NavLink to={"brands"}>Brands</NavLink>
                </li>
              </ul>
            </div>
          )}

          {/* ✅ أزرار التسجيل والخروج (ثابتة على اليمين) */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            {UserToken ? <>
              <span className="relative px-2 py-1 hover:text-main">
  <NavLink to="cart" className="relative">
    <i className="fas fa-shopping-cart fa-xl"></i>
    {numOfCartItems > 0 && ( 
      <span className="absolute top-[-8px] right-[-10px] bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        {numOfCartItems}
      </span>
    )}
  </NavLink>
</span>

                <span onClick={logout} className="px-2 py-2 cursor-pointer hover:text-red-500">
                Log Out
              </span>
            
            </>
              
          
             : (
              <>
                <NavLink to={"login"} className="px-2 py-2 hover:text-main">
                  Login
                </NavLink>
                <NavLink to={"register"} className="px-2 py-2 hover:text-main">
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* ✅ زر القائمة المنسدلة في الشاشات الصغيرة */}
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

        {/* ✅ القائمة المنسدلة عند الشاشات الصغيرة (تظهر فقط عند تسجيل الدخول) */}
        {UserToken && (
          <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-100 overflow-x-hidden`}>
            <ul className="flex flex-col items-center py-4 space-y-2">
              <li className="py-2 hover:text-main">
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li className="py-2 hover:text-main">
                <NavLink to={"products"}>Products</NavLink>
              </li>
              <li className="py-2 hover:text-main">
                <NavLink to={"cart"}>Cart </NavLink>
              </li>
              <li className="px-2 py-1 hover:text-main">
                  <NavLink to={"wishlist"}>Wishlist</NavLink>
                </li>
              <li className="py-2 hover:text-main">
                <NavLink to={"categories"}>Categories</NavLink>
              </li>
              <li className="py-2 hover:text-main">
                <NavLink to={"brands"}>Brands</NavLink>
              </li>

              <div className="my-4 border-t border-gray-300 w-full"></div>

              {/* زر تسجيل الخروج في القائمة المنسدلة */}
              <li className="py-2 text-red-500 cursor-pointer hover:text-red-700">
                <span onClick={logout}>Log Out</span>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}