import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast, { ToastBar } from "react-hot-toast";
// import ResetPassword from './ResetPassword';



export default function ResetPassword() {

// هنعمل اتنين  يوز ستيت  نخزن فيهم  قيمه  الميل  الي   اليوزر  بيدخلها  والباسورد  الجديد
const [email, setemail] = useState(null)
const [newPassword, setnewPassword] =useState(null)


  async  function  updateNewPassword() {
    try {
      let {data} =await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
         email: email,  //طبعا  هنا  الميل   والباسورد  احنا  حطينا بالفانكشن  بتاعتهم فالفورم الداتا  الي  اليوزر  دخلها   وهيبعتا  بقا  للابي  اي  
        newPassword:newPassword 
    })

      //  بعد ما  الباسورد  يتغير     بيرجع  توكن   اليوزر  الجديد  احطه  فاللوكل   ستوريج
       if (data.token) {
        localStorage.setItem("userToken", data.token);
      }
      // بعد كده  اوديهه بقا   للهوم وهيكون  لوجين 
      
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
    }
    catch (e) {
      console.log(e);
    }
  }








  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        <form className="space-y-4"  
         onSubmit={(e) => {
          e.preventDefault(); // ✅ منع إعادة تحميل الصفحة
          updateNewPassword(); // ;كده اول  ما  ادوس  عالريست  باسورد  يشغل  الفانكشن  و
        }} >
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Your Email
            </label>
            <div className="relative mt-1">
              <input
                value={email}
                onChange={(e) => setemail(e.target.value) } //كده لما  اليوزر  يدخل الميل  هيتحفظ  فاليوز ستيت  الي  عملناها  
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          {/* New Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="relative mt-1">
              <input
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}  //كده  لما اليوزر  يدخل الباسورد الجديد  يتبعت  للستيت  بتاع الباسورد
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter new password"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
