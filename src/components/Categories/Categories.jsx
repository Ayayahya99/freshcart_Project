import React, { useEffect, useState } from "react";
import axios from "axios";
import Looding from "../Looding/Looding";

export default function Categories() {
  const [Categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]); //   

  async function getCategories() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/Categories`
      );
      setCategories(data.data);
      // console.log(data.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function getSubcategory(CatID) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${CatID}/subcategories`
      );
      setSubcategories(Array.isArray(data.data) ? data.data : []); // اتاكد  انها  اراي  
    } catch (e) {
      // console.error(e);
      setSubcategories([]);  
    }
  }

  useEffect(() => {
    getCategories();
  }, []);



  
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">All Categories</h1>

        {Categories.length === 0 ? (
          // <p className="text-gray-600">No Categories found.</p>
          <Looding/>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {Categories.map((category) => (
              <div
                key={category._id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-4 
                transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0px_4px_20px_rgba(34,197,94,0.3)] cursor-pointer"
                onClick={() => getSubcategory(category._id)} // لما يدوس   عالزرارا   يجيب  الصب  كاتيجوري ز
              >
                <img
                  className="w-full h-40 object-contain rounded-lg"
                  src={category.image}
                  alt={category.name}
                />
                <h5 className="text-lg font-semibold text-gray-900 mt-2 text-center">
                  {category.name}
                </h5>
              </div>
            ))}
          </div>
        )}
      </div>

{/* هنا  بعرض   الصب  كاتيجوري  */}
      {subcategories.length > 0 && (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Subcategories</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {subcategories.map((subcat) => (
              <div
                key={subcat._id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-4 
                transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0px_4px_20px_rgba(34,197,94,0.3)] cursor-pointer"
              >
                
                <h5 className="text-lg font-semibold text-gray-900 mt-2 text-center">
                  {subcat.name}
                </h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
