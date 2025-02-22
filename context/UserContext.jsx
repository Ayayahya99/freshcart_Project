// ازاي  نعمل  كونتيكست الي  احنا  قونا  عليه  المخظن بتاع  الداتا 
// خل ي  بالك في  مخزن  هنعمله لليوزر وواحد  للمنتجات  واحد لحاجه  تانيه  وهكاذا  

import { createContext,useEffect,useState} from "react";
import ForgetPassword from './../src/components/ForgetPassword/ForgetPassword';
import axios  from 'axios';
import toast from "react-hot-toast";

// دي  الفانكشن  الي  بتكريتلي   الكونتيكست    
// كده  فتحت  مخزن اسمه  يوزر  كونتيكست 
export let UserContext =createContext()   //عكلناله اكسبورت  عشان ده المخزن  الي  هنعمله امبورت او هنفتحه  عند اي  حد من  الكوبونات الاولاد 


//ده الكوبونانت  الي    فيه هحط  فيه  الداتا   بتاع  اليوزر  
// الكومبونانت ده الهدف منه يمد كل  عياله بالداتا  
// مش  احنا قولنا اننا  عايزين التوكن بتاع اليوزر  كل  الكومبونانت  تشوفه  عشان ده الي  هخلي  بيه لليوزر  اكسس  على  كومبونانت  معينه  

export default function UserContextProvider({children}){       
    //    هنا  الفاليو الي  انا عايزه  ابعتها  لولادي دي الداتا  
    //   const [count, setcount] = useState(0)
      const [UserToken, setUserToken] = useState(null)
      const [email, setEmail] = useState('');
    //   const [UserName, setUserName] = useState("aya")

    //    function changeCount() {
    //     setcount(Math.random())
        
    //    }





// {/* بصي  يقا الاب  قولنا بنعمل  فيه داتا  وابعتها  لاطفال  اليوزر  كونتيكست  */}
  

//  وهنا  ببعتها  لولادي  فالفاليو 






// reload problem
// بص  لما  بنعمل  ريلود وانا  عامل  لوجين  الداتا كلها  بتطير  
// فالوكن بيتشال من اللوكل ستوريج وكم  الكونتيكست   فهيخرجني  بره 

useEffect(()=>{
    if (localStorage.getItem("userToken")) { //الي  هو انا  بقوله لما  يحصل  ريفريش  شوف  بو  لقيت  توكين  عندك
        setUserToken(localStorage.getItem("userToken"))   //مش   هندلته بقا    حطته  تان ي  عندك  وكده مش هيتمسح  
  
    }
   
})



async function ForgetPassword(email){

    try {
        let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {email})
        toast.success(data.message);
        console.log(data)
    } catch (e) {
        console.log(e)
    }
 

}




    return <UserContext.Provider value={{UserToken, setUserToken,ForgetPassword,setEmail}} >
                       {children}

    </UserContext.Provider>

}