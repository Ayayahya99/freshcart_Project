 import React from 'react'
import style from "./Looding.module.css"
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Looding() {

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <>
    
       <div className="sweet-loading py-10 flex justify-center items-center h-screen">
   
      <ClipLoader
        color={'#0aad0a'}
        loading={loading}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </>
  )
}
 