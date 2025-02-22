import React, { useEffect, useState , CSSProperties, useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

import ClipLoader from "react-spinners/ClipLoader";
import Looding from './../Looding/Looding';
import { CartContext } from "../../../context/CartContext";
import { WishListContext } from "../../../context/WishListContext";
export default function ProductDetails() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false ,
    autoplay:true,
    autoplaySpeed: 2000,
  };

  let { id } = useParams(); //لو في  اي  برامز جايه  فاليو ار  ال  الهوك ده  هو الي  بيستلمها
  // يعني  الهوك  ده كده من الاخر  مرجعلنا الايدي
  //  console.log(x)

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  let {addProductToCart}=useContext(CartContext);
  let {addItemToWishList, removeWishListItem, wishlistIds}=useContext(WishListContext); //هنجيب  الفانكشن من  لكونتيكست 

  async function getProductDetails(productId) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    console.log(data);
    setProduct(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getProductDetails(id);
  }, []);

  function toggleWishlist(productId) {  //فانكشن  عشان امسح العنصر واضيفه  فالوي ليست  بناء  على  الايدي
    if (wishlistIds.has(productId)) {
      removeWishListItem(productId);
    } else {
      addItemToWishList(productId);
    }
  }
  return (
    <>
      {loading ? (
        <Looding />
      ) : (
        <div className="flex flex-col md:flex-row py-20 items-center gap-10 px-6">
          {/* ✅ صورة المنتج */}
          <div className="w-full md:w-1/3">
            {/* <img src={product.imageCover} className="w-full rounded-lg shadow-md" alt={product.title} /> */}

            <Slider {...settings}>
               {product.images.map((image , index)=> <img key={index} src={image} className="max-w-[400px]  w-full rounded-lg " alt={product.title} /> )}
            </Slider>
          </div>

          {/* داتا المنتج */}
          <div className="w-full md:w-2/3 px-6">


          <div className="flex justify-between items-center mt-4 gap-4">
          <h2 className="text-2xl font-semibold">{product.title}</h2>

          {/* اخيرا الزرار  لو الايد  فالويش  ليست  خليه  احمر  لو لا  خليه  جراي  */}

          <span onClick={() => toggleWishlist(product.id)} className="flex items-center cursor-pointer">
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

            
          
            <p className="mt-4 text-gray-600">{product.description}</p>
            <p className="text-main font-bold mt-2">{product.category.name}</p>

            {/* بعرض  السعر  والتقييم  */}
            <div className="flex justify-between items-center mt-4 gap-4">
              <span className="text-lg font-semibold">{product.price} EGP</span>
              <span className="flex items-center">
                <i className="fas fa-star text-yellow-500 mr-1"></i>
                {product.ratingsQuantity}
              </span>
            </div>
             
            {/* بضيف عنصر للكارت */}
            <button onClick={()=>addProductToCart(product.id)} className="btn w-full mt-6 bg-main">Add To Cart</button>
        
          </div>
        </div>
      )}
                    
    </>
  );
}
