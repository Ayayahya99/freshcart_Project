
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
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`, 
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
    <>
      <h1>ChickOut</h1>

      <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
  {/* Details Input */}
  <div className="mb-5">
    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900">Details</label>
    <input 
      type="text" 
      name="details"
      value={formik.values.details}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      required 
    />
    {formik.touched.details && formik.errors.details ? (
      <p className="text-red-500 text-xs">{formik.errors.details}</p>
    ) : null}
  </div>

  {/* Phone Input */}
  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
    <input 
      type="tel" 
      name="phone"
      value={formik.values.phone}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      required 
    />
    {formik.touched.phone && formik.errors.phone ? (
      <p className="text-red-500 text-xs">{formik.errors.phone}</p>
    ) : null}
  </div>

  {/* City Input */}
  <div className="mb-5">
    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
    <input 
      type="text" 
      name="city"
      value={formik.values.city}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      required 
    />
    {formik.touched.city && formik.errors.city ? (
      <p className="text-red-500 text-xs">{formik.errors.city}</p>
    ) : null}
  </div>

  {/* Submit Button */}
  {looding ? (
    <button type="button" className="w-full text-white bg-main font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      <i className="fas fa-spinner fa-spin"></i>
    </button>
  ) : (
    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      Pay Now
    </button>
  )}
</form>









    </>
  );
}
