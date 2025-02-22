import React from 'react'
import style from "./ProtectedRoute.module.css"
import { Navigate } from 'react-router-dom'
export default function ProtectedRoute({children}) {
  
       {/* انا  عايزه  اقوله  يا  باشا   انت هيجليك  شويه  اطفال كومبونانت    */}
       {/* لو في  توكن  اديله  لكومبةنانت  ال ي عايزه  */}
       {/* لو ما  فيش  توكين  وديه  للوجين  بيدج */}
   
       if (localStorage.getItem("userToken")) {
        return children
      
       }
       else {
        return <Navigate to={'/login'}/>
       }
        
       


    
  
}
 