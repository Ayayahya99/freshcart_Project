import React from 'react'
import style from "./CategorySlider.module.css"
import  axios from 'axios';
import{  useEffect ,useState} from 'react'
import Slider from "react-slick";
import index from './../../../node_modules/resize-observer-polyfill/dist/ResizeObserver.es';
export default function CategorySlider() {


  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows:false ,
    autoplay:true,
    autoplaySpeed: 2000,
  };

    const [Categories, setCategories] = useState([])

  async function getCategories() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    // console.log(data.data)
    setCategories(data.data)
  }

  useEffect(() => {
    getCategories()
  })


  return (
    <>
    <div className=' text-xl text-slate-700'>Shop Popular Categories</div>
        
            <Slider {...settings}>
               {Categories.map((category , index)=><div key={index} className='my-3  '>


                       <img src={category.image} className="w-full shadow-md h-[200px]" alt={category.title} />
                       <h3>{category.name}</h3>

               </div> )}
            </Slider>
    
     
 

        {}
    </>
  )
}
 