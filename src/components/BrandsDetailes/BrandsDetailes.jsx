import React, { useContext, useEffect, useState } from "react";
import style from "./BrandsDetailes.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from "../../redux/productSlice";

// import { Dispatch } from './../../../node_modules/redux/src/types/store';
import Looding from './../Looding/Looding';
import { Link } from "react-router-dom";
export default function BrandsDetailes() {
  let {products , isloading} =useSelector((store) => store.products)
  
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())

  })
  return (
    <>
        <h1 className='bg-red-800 w-full h-5 mt-10'></h1>
      {isloading ?
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
               
    </>
  )
}
 