
import {configureStore} from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import { productReducer } from "./productSlice";



// هنعمل   ستور  نخزن فيه  الداتا      ونحطه  ففاليو  ونعكله   اكسبورت  لي  عشان  اخمنا  هنبروفايد الداتا دي  لكل الابلكيشنز

export let  store = configureStore({
    reducer:{
        counter :counterReducer ,//انا  كده  عرفت  الاستور  بتاعي   اني  عندي    كونتر  ريديوسر  
        products:productReducer,
    }
})


// يبقى  كده  الخطوات  من الاول  انا  بعمل  ستور    واقسمه لاسلايس  سلايس  مارت  سلاي بروداكت 
// كل  سلايس  هو ستيت  فيها اي  فانكشن  وداتا   
// بعدل فالاسلايس  من  خلال  ريديوسر  انا  بديهولها   
// وابعت  كل الريديوسر  بتاع  كل الاسلايس  بتوعي  للستور  فالاخر 
// وبس  اروح استخدمها  فاي  مكان  انا  عايزاها  
//  let  {count} = useSelector((store)=>store.counter)
  // console.log(x)
//   let dispatsh = useDispatch() 
// واغلفها  بالدسبتش  
// وابعتها  بقا للي  عايزاه 
