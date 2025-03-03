import React from 'react'
import style from "./Footer.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { increase,decrease,increaseByAmount } from "../../redux/counterSlice";
export default function Footer() {

  // طيب انا عايزه  اعرض    الستيت  بتاعي الي فيها  الكونتر  يا ايه 
  // فانا  عايزه  انه  يرجعل ي    الاستور  الي  هو  المخزن  كله الي  عملنها  ففاليو

  let  {count} = useSelector((store)=>store.counter)
  // console.log(x)
  let dispatsh = useDispatch()
  return (
    <>
        <h1 className='bg-main w-full h-5 mt-10'></h1>

        <h2> count {count}</h2>
        <button onClick={()=> dispatsh(increase())}>increase</button>
 
        <button onClick={()=> dispatsh(decrease())}>decrease</button>
        <button onClick={()=> dispatsh(increaseByAmount(10))}>increaseByAmount</button>
     

    
    </>
  )
}
 