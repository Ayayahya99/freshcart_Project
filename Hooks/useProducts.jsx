import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useProducts() {
 
function getProductss(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  
  let response = useQuery( {
    queryKey: ['recentProducts'],
    queryFn: getProductss,
    gcTime:300000,       //انا  بقوله   لو  قعدت  اكتر  من  خمس  دقايق بره  الكومبونانت  هو  هيعمل  لودينج 
                      //  كده  يعني  بعد تلت ثواني وانا  بره الكومبونانت  هيمسح الداتا  من  الكاش  فلما  ارجع  هيحملهم من اول  وجديد
                      // يبقى  الراجل  ده  عمره  ما هيعمل لودينج الا  في  حاله الداتا اتمسحت من  الكاش 
  })
  
  
//   console.log(data?.data.data)
  
  return response
}
