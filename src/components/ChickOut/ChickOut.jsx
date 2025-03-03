
import style from "./ChickOut.module.css";

import React, { useContext, useEffect, useState } from "react";
// import style from "./Login.module.css";

import {useFormik} from 'formik'
import values from './../../../node_modules/lodash-es/values';
import { UserContext } from "../../../context/UserContext";


import  * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import toast from "react-hot-toast";



export default function ChickOut() {







  
  const [looding , setlooding] = useState(false)
  let{setUserToken,ForgetPassword} =useContext(UserContext)
   let{cart} =useContext(CartContext)
  let  navigate =useNavigate()   //دي  يا  ايه  الي  بتوديني  لصفحه تانيه دايركت  

 async function handleCheckout(shappindAddress){  //الفاليوز دي الي  هتستقبل  الداتا  بتاعتب الي جايه من  الفورميك

   try {
      setlooding(true)
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=https://freshcart-project-ucm2.vercel.app/`, 
      {shappindAddress},
      {headers:{token:localStorage.getItem("userToken")}})

      //  console.log(shappindAddress)  ///الفاليو دي  الداتا الي  جاتل يمن  اليوزر 
       console.log(data)  // الداتا  دي  النتيجه الي  جيالي  من الباك اند بعد ما بعت الفاليو دي ليها 
       toast.success(data.status )
       location.href = data.session.url   //بصي الداتا  الي  بترجع دي  فيعا  يو ار  ال  لي  هو  بيوديني  على  صفحه الدفع فانا هنا  بقوله  لما  ادوس  دفع   يوديني  على  صفحه  الدفع  جي  
       

       setlooding(false)
      

     }
     catch(er) {
      //  console.log(er.response.data.message) //لو في  مشكله دي  رساله الخطأ الي  بتتبعت فاكره  لما  قوبنا ان كاتش  بتبلع الايرور قبل ما  يوصل للكونسول 
      //  setApiError(er.response.data.message)
      //  setlooding(false)
     }

}





const formik =  useFormik({
initialValues:{
   city:'',
   details :'',
   phone:'',

},onSubmit:handleCheckout
})








return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
        Checkout
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Details Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Details</label>
          <input
            type="text"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        {/* City Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">City</label>
          <input
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-main text-white font-medium rounded-lg py-2.5 hover:bg-green-700 transition duration-300"
          disabled={looding}
        >
          {looding ? <i className="fas fa-spinner fa-spin"></i> : "Pay Now"}
        </button>
      </form>
    </div>
  </div>
);

}
