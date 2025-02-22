import React, { useContext, useEffect, useState } from "react";
// import style from "./Login.module.css";

import {useFormik} from 'formik'
import values from './../../../node_modules/lodash-es/values';
import { UserContext } from "../../../context/UserContext";


import  * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from "react-router-dom";








export default function Login() {



// دي  الفانكشن الي  هتاخد الداتا لما  اعمل  سبميت  وتبعتها  للباك  اند  

     const [ApiError , setApiError] = useState(null)
     const [looding , setlooding] = useState(false)
     let{setUserToken,ForgetPassword} =useContext(UserContext)
       
     let  navigate =useNavigate()   //دي  يا  ايه  الي  بتوديني  لصفحه تانيه دايركت  
    async function Login(values){  //الفاليوز دي الي  هتستقبل  الداتا  بتاعتب الي جايه من  الفورميك

      try {
         setlooding(true)
         let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)

          console.log(values)  ///الفاليو دي  الداتا الي  جاتل يمن  اليوزر 
          console.log(data)  // الداتا  دي  النتيجه الي  جيالي  من الباك اند بعد ما بعت الفاليو دي ليها 
       
          setlooding(false)
          localStorage.setItem("userToken", data.token)    //بصي   هناخد   التوكن ال ي  جاي   من  الباك اند واحطه  فاللوكل  ستوريج عشان  بقا  يبدا  يتعامل معاه فالابلكيشن
                                                          //  الطريقه دي  مش  اماان  عشان اي حد ياخد التوكن  بتاعه  ويبعته لكل  صحابه  زي ما واتش  ات  عملت  كده 
         setUserToken(data.token)
   //  لو  ما اطلعش  اي  غلط والداتا     راحه  للباك اند زقالتلي  تم الريجيت  ي باشا   انا عايزه اودي  الراجل ده  عال الهوم  
  //  كده لو انت  تمام  يوديه  الهوم  
          navigate('/')
        }
        catch(er) {
          console.log(er.response.data.message) //لو في  مشكله دي  رساله الخطأ الي  بتتبعت فاكره  لما  قوبنا ان كاتش  بتبلع الايرور قبل ما  يوصل للكونسول 
          setApiError(er.response.data.message)
          setlooding(false)
        }

}



 
  

let validateschem = Yup.object().shape({

  
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),

})


const formik =  useFormik({
  initialValues:{

      email :'',
      password:'',
  
  },onSubmit: Login,   //لما يحصل   سبميت   شغل الريجيستر  فانكشن  الي   هتبعت الداتا  للباك اند وهوو من  نفسه باي  ديفولت  بياخد الداتا الفاليوز ال ي اليوزر  دخلها  ويبعتها  للفانكشتن   
   validationSchema : validateschem , //هيبعت الداتا  لفالديت  سكيما  ده  اوبجيكت  عشان  يتشيك على الفاليدشن بتاع الداتا الي  بيدخلها اليوزر  
})





async function handleForgetPassword() {
  try {
    await ForgetPassword(formik.values.email); // استدعاء الفانكشن
    navigate("/forgot-password"); // ✅ التوجيه لصفحة إدخال الكود
  } catch (error) {
    console.log("Error sending reset email:", error);
  }
}

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </h1>

              {/*  بصي  احنا  عايزين  نفهم الفورم  ان  لما نعمل  سابميت  تحط الدات  وتبعتخا للباك اند */}
              {/*  في  فانكشن  اسمها   اون  سابميت  دي   بتاخد الاوبجيكت  فورميك الي  في  كذا حاجه  منها  الهاندل سبمت  */}
            
            
            {/* genral  error  after submit    من الاخر الايرور  الي  بيرجع من الابي  اي   من الباك اند */}
            { ApiError &&(                  //بصي  دي  شرط لو  في  ايرور  طلع الدفايه  الحلوه  دي  
                  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"role="alert">
                    {ApiError}
                  </div>
                  
                )}

            
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-9 md:space-y-6"
                action="#"
              >
                
           






                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                 {/* error */}
                 {formik.errors.email&& formik.touched.email &&  (                  //بصي  دي  شرط لو  في  ايرور  طلع الدفايه  الحلوه  دي  
                  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"role="alert">
                    {formik.errors.email}
                  </div>
                )}






                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                 {/* error */}
                 {formik.errors.password&& formik.touched.password &&  (                  //بصي  دي  شرط لو  في  ايرور  طلع الدفايه  الحلوه  دي  
                  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"role="alert">
                    {formik.errors.password}
                  </div>
                )}



  {/* ✅ زر "نسيت كلمة المرور" */}
  <p className="text-sm font-light text-gray-500 text-right">
      <span
        type="button"
        onClick={handleForgetPassword}
        className="font-medium text-primary-600 hover:underline cursor-pointer"
      >
        Forgot Password?
      </span>
    </p>
               




                {looding ? (  <button type="button"className="w-full text-white bg-main hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" >
                  <i className=' fas fa-spinner fa-spin '> </i>
                </button>) :( <button  type="submit"className="w-full text-white bg-main hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Log In
                </button>)}

               


                <p className="text-sm font-light text-gray-500">
                  Don't have an account?{" "}
                  <a
                     onClick={() => navigate('/register')} 
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Sign up here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
