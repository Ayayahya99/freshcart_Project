import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [resetCode, setResetCode] = useState(""); 
  let navigate = useNavigate();

  async function verifyCode() {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        { resetCode }
      );

      console.log(data);
      toast.success("Code verified successfully");

      navigate("/resetpassword"); 
    } catch (e) {
      console.log(e);
      toast.error("Invalid or expired code");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify Your Code
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            verifyCode();
          }}
          className="space-y-4"
        >
          {/* Input Field */}
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
             
            </label>
            <input
              type="text"
              id="code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter verification code"
              required
            />
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 transition"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}










// طيب افهمي  احنا  هنعمل اي    فالجزء  ده  
// لاولا  اليوزر  هيعمل  فورجيت  باسورد  فيتبعت  كود  عالميل  ويبعتن ي للصفحه ال ي  هكتب  فيها  الكود
// اكتب  الكود  عايزه الانبوت ال ي يدخل ده يتبعت للسرفر   فهنبعته  لل verfycode
// السرفر  يتاكد انه صح  او  غلط  
// لو  غلط   يبعت  انه  غلط
// لو  صح  يقولي  اعملي  ريسيت    للباسورد  بباسورد  جديد
// وابعت  الباسورد  الجديد  للسرفر 