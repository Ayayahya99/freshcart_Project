// انا بقا  عايزه  اخد    سلايس  ا  قطعه من  المخزن 

import { createSlice } from "@reduxjs/toolkit";
import { IndentDecrease } from "lucide-react";

let initialState ={count:0 ,userName:"aya yahya"}

// بكريت  سلايس  بقا    وابدا  افهمها  
let  counterSlice = createSlice({
    name: "counterslice",  //ده   اسم  الاسلايس  الي  عملتها 
    // initialState: initialState
    initialState,   //وبعدين   احط  انشييال فاليوز للاسلايس   ده 
    reducers:{     // واجهز بقا الريديوسرز  بتوعي  الي  هم بس  ليهم الحق  يغيرو فالاسلايس   بتاعي 
       increase: (state ,actoin)=>{
        // console.log("increase")
        state.count+=1
       },
       decrease: (state ,actoin)=>{
         state.count-=1
       },
       increaseByAmount: (state ,actoin)=>{
        // console.log("increase")
        state.count+= actoin.payload
        // console.log(actoin);بص  الاكشن  ده  بيرجع  فيه الداتا الي  بعتها  كبرامتر  للفانكشن 
        // فكده  هيزود عشره  كل  مره  عشان انا  بعتالها  عشره 
          
        
       },


    }


})

// اا عايزه  اودي  ال  الاسلايس   دي للستور  اعرفها  بيها    فده  هو اللمثل  للسلايس  بتاعتي  اي   بيتكلم  باسمها  

export let counterReducer =counterSlice.reducer
export let {increase,decrease,increaseByAmount} = counterSlice.actions