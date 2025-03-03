import React from 'react'
import style from "./Layout.module.css"
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
import BrandsDetailes from '../BrandsDetailes/BrandsDetailes';
import { useContext } from "react";
import { DarkModeContext } from "../../../context/DarkModeContext";

export default function Layout() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <>
      
        <Navbar/>
        {/* <div className="container">  */}
        <div className={` pt-16 container ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} p-4 rounded-lg shadow-md`}>

           <Outlet>
                                         {/* هنا المكان الي   هيترن فيه  كل الكومبونانت  بتاع الابلكيشن   */}
          </Outlet>
        </div>
        
        {/* <Footer/> */}
        {/* <BrandsDetailes/>  */}
    </>
  )
}
 