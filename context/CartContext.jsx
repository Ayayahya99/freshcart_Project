import { createContext, useState , useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Toaster from "react-hot-toast";
//نكريت  كونتيكست  ونعمله  اكسبورت  بره   عشان  هنستخدمه

export let CartContext = createContext();

// عشان بقاي  الابلكيشن  ياخدو من  الكونتكست  ده  بعملهم الكومبونانت  ده
// الكومبونانت  ده ان  شاء  الله  هيجيله اطفال   فنديله الاطفالذ
export default function CartContextProvider({ children }) {
  
  // let navigate =useNavigate()
  const [cart, setCart] = useState(null);
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("UserToken"));


  useEffect(() => {
    const storedToken = localStorage.getItem("UserToken");
    setToken(storedToken);  })

 
  async function addProductToCart(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId }, //دف الفابدي هبعتله  البروداكت ايدي
        { headers: headers } //هنا  فالهدير  هبعتله التوكن الي  هي  فالاستوريج
      );

      // بصي  كده احنا  بعتنا التوكن  والبروداكت ايدي   للينك
      console.log(data);
     
      setCart(data);
      setNumOfCartItems(data.numOfCartItems);
      getProductsCart();
      toast.success(data.message);
      // toast.success(data.numOfCartItems);

      // useEffect(() => {toast('Here is your toast.');})
    } catch (err) {
      console.log(err);
      toast.error("error");
    }
  }

  // دي  بتجيب   الداتا الي  انا  ضيفتها  فالكارت 
  async function getProductsCart() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
             { headers: headers } //هنا  فالهدير  هبعتله التوكن الي  هي  فالاستوريج
      );

      // بصي  كده احنا  بعتنا التوكن  والبروداكت ايدي   للينك
      console.log(data);
      setCart(data); // هنا  هات الداتا  الي  فالكار  وخزنها  هنا   عشان  ما تطرش  انا هحتاجها  فالكارت  كومبونانت 
      setNumOfCartItems(data.numOfCartItems);

    } catch (err) {
      console.log(err);
   
    }
  }


  async function addToCount (productId,count){
    try {
      let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {count}, //دف الفابدي هبعتله  الكونت 
        { headers: headers } //هنا  فالهدير  هبعتله التوكن الي  هي  فالاستوريج
      
      )
       // بصي  كده احنا  بعتنا التوكن  والبروداكت ايدي   للينك
       console.log(data);
       setCart(data);
      
       toast.success(data.status);
 
       // useEffect(() => {toast('Here is your toast.');})
     } catch (err) {
       console.log(err);
       toast.error("Failed to add in card, please try again!");
     }
  }



   async function removeCartItem(productId){
    try {
       let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: headers }
       )
     // بصي  كده احنا  بعتنا التوكن  والبروداكت ايدي   للينك
     console.log(data);
     setCart(data);
     setNumOfCartItems(data.numOfCartItems);
     toast.success("product deleted");

     // useEffect(() => {toast('Here is your toast.');})
   } catch (err) {
     console.log(err);
     toast.error("Failed to delete the product , please try again!");
   }
   }


   
   async function removeAllCartItem(){
    try {
       let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,
        { headers: headers }
       )
     // بصي  كده احنا  بعتنا التوكن  والبروداكت ايدي   للينك
     console.log(data);
     setCart(data);
     setNumOfCartItems(0);
   
    
     toast.success("Cart deleted");
   

     // useEffect(() => {toast('Here is your toast.');})
   } catch (err) {
     console.log(err);
     toast.error("Failed to delete the card, please try again!");
   }
   }




   



  // اول  ما  حد  يفتح الفانكشن دي  هترن والي  هي  بتجيب  الداتا من  الكارت   وتبعتها  للسيت  كارت   ال ي فيها محتويات الكارت   اي حد  فالابلكيشن  بقا  احتاجها  هي  محفوظه  ما طارتش  

 
  // والاطفال  دول انا  هديهم داتا الي  هي  الفاليوز  دي
  //  يعين  كده  انا ببعت الدالفانكشن  دي  لكل اطفالي   عشان  يستخدموها
  return (
    <CartContext.Provider value={{ addProductToCart,cart,getProductsCart,addToCount,removeCartItem ,removeAllCartItem,numOfCartItems}}>
      {children}
      {/* <Toaster/> */}
    </CartContext.Provider>
  );
}
