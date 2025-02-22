import React, { useContext, useEffect, useState } from "react";

import Products from "../Products/Products";

import Brands from "../Brands/Brands";
import { UserContext } from "../../../context/UserContext";

import axios from "axios";
import Looding from "../Looding/Looding";
import { Link } from "react-router-dom";
import style from "./RecentProduct.module.css";
import { CartContext } from "../../../context/CartContext";
import { WishListContext } from "../../../context/WishListContext";
import { useQuery } from "@tanstack/react-query";
// import UseProducts from "../../../Hooks/UseProducts";
export default function RecentProduct() {
  let { addProductToCart } = useContext(CartContext);
  let { addItemToWishList,wishlistIds ,removeWishListItem } = useContext(WishListContext);

  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

 

 


  async function getProducts() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    console.log(data.data)
    setproducts(data.data);
    setloding(false);
  }

  useEffect(() => {
    getProducts();
  });

// نلغي بقا  الطريقه الي فوق  دي 
//  احنا  بقا  عايزن  الداتا الي  من   الابي   اي دي  مش  كل  ما ارجع  للصفحه  يشغل  الفانكشن ويلود وترجع  عايو=زاها  تفضل  موجوده  بلاش  رخامه 

// function getProductss(){
//   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
// }

// let { data, isLoading, isFetching ,isError } = useQuery( {
//   queryKey: ['recentProducts'],
//   queryFn: getProductss,
//   gcTime:3000,       //انا  بقوله   لو  قعدت  اكتر  من  خمس  دقايق بره  الكومبونانت  هو  هيعمل  لودينج 
//                     //  كده  يعني  بعد تلت ثواني وانا  بره الكومبونانت  هيمسح الداتا  من  الكاش  فلما  ارجع  هيحملهم من اول  وجديد
//                     // يبقى  الراجل  ده  عمره  ما هيعمل لودينج الا  في  حاله الداتا اتمسحت من  الكاش 
// })


// console.log(data?.data.data)


//طب والاحلى من كل  ده اننا  نحط الكلام ده كله  فهوك  عشان اعرف استخدمه  فاكت ر من كومبونانت   واستخدمه  كده 
// let { data, isLoading} =UseProducts()

 

  function toggleWishlist(productId) {
    if (wishlistIds.has(productId)) {
      removeWishListItem(productId);
    } else {
      addItemToWishList(productId);
    }
  }

  return (
    <>


      {loading ?
        <Looding />
       : (
        <div className="flex flex-wrap py-8 gap-y-4 justify-center">
          {products.map((product, index) => (
            <div className="w-1/5">
              {/*  */}
              <div className="product p-2 rounded-lg">
                <Link to={`productDetailes/${product.id}`}>
                  {" "}
                  {/*  كده انا ببعت الايدي  مع  الراجل ده  */}
                  <img
                    src={product.imageCover}
                    className="w-full"
                    alt={product.title}
                  />
                  <h3 className="text-main">{product.category.name}</h3>
                  <div className="flex justify-between items-center mt-4 gap-4">
                    <h3 className="text-xl">
                      {product.title.split(" ", 2).join("  ")}
                    </h3>

                    <span  onClick={(e) => { e.preventDefault(),toggleWishlist(product.id)}}className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-8 w-8 ${wishlistIds.has(product.id) ? "text-red-600 fill-red-600" : "text-gray-400"}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star rating-color"></i>{" "}
                      {product.ratingsQuantity}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => addProductToCart(product.id)}
                  className="btn w-full"
                >
                  Add To Cart
                </button>
                {/* <button   onClick={() =>getProductDetaiels(product.id)} className='btn w-full'>product  dtailes</button>        */}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* <RecentProduct/> */}

      {/* كده  انا  بعت  للكومبونانت  بروداكت اتنين  كوبيونانت  هتروحله  فالبروبس  */}
      {/* <Products>   
          <Cart/>
          <Brands/>   
          {/* كده  دول  تشلدرين  للبروداكت   */}
      {/* </Products> */}
    </>
  );
}
