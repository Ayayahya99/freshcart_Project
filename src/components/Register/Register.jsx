import React, { useContext, useState } from "react";
// import style from "./Register.module.css";

import {useFormik} from 'formik'
import values from './../../../node_modules/lodash-es/values';

import  * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { DarkModeContext } from "../../../context/DarkModeContext";








export default function Register() {



// دي  الفانكشن الي  هتاخد الداتا لما  اعمل  سبميت  وتبعتها  للباك  اند  

     const [ApiError , setApiError] = useState(null)
     const [looding , setlooding] = useState(false)
     let{setUserToken} =useContext(UserContext)
      const { darkMode } = useContext(DarkModeContext);








     let  navigate =useNavigate()   //دي  يا  ايه  الي  بتوديني  لصفحه تانيه دايركت  
    async function Register(values){  //الفاليوز دي الي  هتستقبل  الداتا  بتاعتب الي جايه من  الفورميك

      try {
         setlooding(true)
         let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)

          console.log(values)  ///الفاليو دي  الداتا الي  جاتل يمن  اليوزر 
          console.log(data)  // الداتا  دي  النتيجه الي  جيالي  من الباك اند بعد ما بعت الفاليو دي ليها 
       
          setlooding(false)
          localStorage.setItem("userToken", data.token)    //بصي   هناخد   التوكن ال ي  جاي   من  الباك اند واحطه  فاللوكل  ستوريج عشان  بقا  يبدا  يتعامل معاه فالابلكيشن
          //                                             //  الطريقه دي  مش  اماان  عشان اي حد ياخد التوكن  بتاعه  ويبعته لكل  صحابه  زي ما واتش  ات  عملت  كده 
          setUserToken(data.token)   //كده  جبت التوكن الي  جه لليوزر بعد ما عمل ريجيت  وحطيته  فمخزن  التوكين 
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

  name: Yup.string().required('name is required').min(3,"min is 3").max(15,"max is  15"),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').matches(/^[A-Z]\w{4,10}$/ , 'invalid password ex(Aya123)').min(8,"min is 8").max(15,""),
  rePassword: Yup.string().required('Password is required').oneOf([Yup.ref('password')],"password  and  repassword do not  match "),
  phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'we need  egyption  number'),
  
})


const formik =  useFormik({
  initialValues:{
      name:'',
      email :'',
      password:'',
      rePassword:'',
      phone:'' ,
  },onSubmit: Register,   //لما يحصل   سبميت   شغل الريجيستر  فانكشن  الي   هتبعت الداتا  للباك اند وهوو من  نفسه باي  ديفولت  بياخد الداتا الفاليوز ال ي اليوزر  دخلها  ويبعتها  للفانكشتن   
   validationSchema : validateschem , //هيبعت الداتا  لفالديت  سكيما  ده  اوبجيكت  عشان  يتشيك على الفاليدشن بتاع الداتا الي  بيدخلها اليوزر  
})




  return (
    <>
      <section className="bg-gray-50">
      <div className={`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} p-4`}>
       
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className={`p-6 space-y-4 md:space-y-6 sm:p-8 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} p-4`}>
          <h1 className={`text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} `}>
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
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your Name
                  </label>
                  <input
                    // هنا  انا  بقوله  ابعت الداتا دي  للفورميك الي  هو فوق
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                  {/* error */}
                  {/* تاتش  عشان لما  اليوزر  يجي ناحيه الايرور  ويكتبه غلط يطلع الايررو  بتاعه  */}
                {formik.errors.name && formik.touched.name &&(                  //بصي  دي  شرط لو  في  ايرور  طلع الدفايه  الحلوه  دي  
                  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"role="alert">
                    {formik.errors.name}
                  </div>
                  
                )}






                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    value={formik.values.mail}
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







                <div>
                  <label
                    htmlFor="rePassword"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Confirm password
                  </label>
                  <input
                    value={formik.values.rePassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    name="rePassword"
                    id="rePassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                 {/* error */}
                 {formik.errors.rePassword&& formik.touched.rePassword &&  (                  //بصي  دي  شرط لو  في  ايرور  طلع الدفايه  الحلوه  دي  
                  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"role="alert">
                    {formik.errors.rePassword}
                  </div>
                )}



                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your phone
                  </label>
                  <input
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="tel"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                {/* error */}
                {formik.errors.phone&& formik.touched.phone &&  (                  //بصي  دي  شرط لو  في  ايرور  طلع الدفايه  الحلوه  دي  
                  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"role="alert">
                    {formik.errors.phone}
                  </div>
                )}
                




                {looding ? (  <button type="button"className="w-full text-white bg-main hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" >
                  <i className=' fas fa-spinner fa-spin '> </i>
                </button>) :( <button  type="submit"className="w-full text-white bg-main hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Create an account
                </button>)}

               


                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <a
                     onClick={() => navigate('/login')} 
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Login here
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
