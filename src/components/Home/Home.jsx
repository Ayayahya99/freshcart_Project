import RecentProduct from "../RecentProduct/RecentProduct"
import React, { useContext, useEffect ,useState} from 'react'

import style from "./Home.module.css"
import MainSlider from './../MainSlider/MainSlider';
import CategorySlider from "../CategorySlider/CategorySlider";
export default function Home() {
  return<>
  
     <div className="">
     <MainSlider/>
  <CategorySlider/>
       <RecentProduct/>
     
     </div>
  
  
  </>


}
 