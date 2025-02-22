import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Looding from '../Looding/Looding';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null); // اخزن  هنا  اي  البروداكت ال ي  اختارته 

  async function getBrand() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(data.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">All Brands</h1>
{/* اشوف  هنا  في  براند اتيعت لو لا   */}
        {brands.length === 0 ? (
          // <p className="text-gray-600">No brands found.</p>
          <Looding/>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-4 
                transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0px_4px_20px_rgba(34,197,94,0.3)] cursor-pointer"
                onClick={() => setSelectedBrand(brand)} // بصي  لما  دوس عالدفايه خزن البراند فالفاريبول ال ي عملناه 
              >
                <img className="w-full h-40 object-contain rounded-lg" src={brand.image} alt={brand.name} />
                <h5 className="text-lg font-semibold text-gray-900 mt-2 text-center">{brand.name}</h5>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* دي  الدفايه الي  هتطلعل ي لما  اضغط   على اي  براند */}
      {selectedBrand && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
      
      {/* زر الإغلاق */}
      <button
        className="absolute top-3 right-3 text-black hover:text-black text-xl bg-transparent hover:bg-transparent border-transparent "
        onClick={() => setSelectedBrand(null)}
      >
        ❌
      </button>

      <div className="flex items-center gap-6">
        {/* الاسم باللون الأخضر */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-green-600">{selectedBrand.name}</h2>
          <p className="text-gray-500 text-lg">{selectedBrand.name.toLowerCase()}</p>
        </div>

        {/* صورة البراند */}
        <img
          className="w-40 h-40 object-contain rounded-lg"
          src={selectedBrand.image}
          alt={selectedBrand.name}
        />
      </div>

      {/* زر الإغلاق السفلي */}
      <div className="mt-4 text-right">
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          onClick={() => setSelectedBrand(null)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}
