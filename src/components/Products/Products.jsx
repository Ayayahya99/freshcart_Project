import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Looding from "../Looding/Looding";
import { CartContext } from "../../../context/CartContext";
import { WishListContext } from "../../../context/WishListContext";
import { useQuery } from "@tanstack/react-query";

// import UseProducts from "../../../Hooks/UseProducts";
export default function Products() {
  let { addProductToCart } = useContext(CartContext);
  let { addItemToWishList, wishlistIds, removeWishListItem } =
    useContext(WishListContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // احنا  هنحفظ السيرش  هنا  

  async function getProducts() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      setProducts(data.data);
      setLoading(false);
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);




  
// نلغي بقا  الطريقه الي فوق  دي 
//  احنا  بقا  عايزن  الداتا الي  من   الابي   اي دي  مش  كل  ما ارجع  للصفحه  يشغل  الفانكشن ويلود وترجع  عايو=زاها  تفضل  موجوده  بلاش  رخامه 
// من  الاخر هو  بيكيش الداتا   بتاعتي  عشان الداتا   مش كل شويه  تلود
// فبيعمل  اي  بقا  بيجبلي  الداتا الي  فالكاش  وفنفس  الوقت  يجيب  الداتا  الجديده  ويقارنها  بالقديمه والجديد يعدله  من غير  لودينج

  // function getProductss(){
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  // }
  
  // let { data, isLoading, isFetching ,isError } = useQuery( {
  //   queryKey: ['recentProducts'],
  //   queryFn: getProductss,
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

  // ونجيب البروداكتس  الي   اتسيفت عندي  وامش ي عليها  بفلتر    لو البروداكت ال ي هو بيعدي   عليه   بنفس  الاسم   احفظه الفاليو دي  الي  اسمها   فلتر  بروداكت 
  const filteredProducts = products.filter((product) =>
    product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-center my-4 mt-16">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-3/4" 
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}  //على حسب الفاليو  الي  بتتكتب  فمربع  السيرش    هيبعت الفاليو الي  بتتكتب  دي   لليوز ستات ال ي  عاملينه فوق  عشان  يحفظ  السيرش  
        />
      </div>

      {loading ? (
        <Looding />
      ) : (
        // بعد كده نعرض  الداتا  بعد ما  فلترتها    وبس  كده سهله   اهي  

        <div className="flex flex-wrap py-8 gap-y-4 justify-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="w-1/5 p-2">
                <div className="product p-2 rounded-lg">
                <Link to={`/productDetailes/${product.id}`}>

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

                      <span
                        onClick={(e) => {
                          e.preventDefault(), toggleWishlist(product.id);
                        }}
                        className="flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-8 w-8 ${
                            wishlistIds.has(product.id)
                              ? "text-red-600 fill-red-600"
                              : "text-gray-400"
                          }`}
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
            ))
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      )}
    </>
  );
}
