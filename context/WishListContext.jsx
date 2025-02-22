import { useState, createContext } from "react";

import WishList from './../src/components/WishList/WishList';
// import  WishListContext from './WishListContext';
import axios from "axios";
import toast from "react-hot-toast";



// نكريت  كونتيكست
export let WishListContext = createContext();


// كومبونانت  ياخد  الفانكشن    والاطفال 

export default function WishListProvider({children}) {
//  نعمل  الفاريبول الي  هنخزن فيه     الويش ليست 
    const [wishlist, setwishlist] = useState(null)
    const [wishlistIds, setWishlistIds] = useState(new Set()); // حفظ الـ IDs للمنتجات في الوِش لِست
    // //  وده  فاريبول اخزن  فيه التوكن  بتاع  اليوزر  الي  هجيبه من اللوكل هوست بس هنخزنه  جيسون داتا 
    const headers = {
        token: localStorage.getItem("userToken"),
      };
    


//    المرحله  التانيه الفانكشن  الي  هنعملها  
// 1)فانكشن  الاضافه
    

async function  addItemToWishList(productId) {
    try {
        let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {productId:productId},{headers:headers})
        console.log(data)
        setwishlist(data)
        getItemToWishList()
        setWishlistIds(prev => new Set(prev).add(productId)); // إضافة المنتج للـ Set
 
   
        toast.success(data.message);
    } 
    catch (e) {
        console.log(e);
        toast.error("Failed to add product in  wishList, please try again! ");
    }

}

// الفانكشن  الي  هتعرض  او هاتجبلي  المنتجات الي  اتضافت

async function  getItemToWishList() {
    try {
        let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:headers})
        console.log(data)
     
        setwishlist(Array.isArray(data?.data) ? data.data : []);
        setWishlistIds(new Set(data.data.map(item => item.id))); // حفظ كل الـ IDs

    } 
    catch (e) {
        console.log(e);
    }
}



async function removeWishListItem(productId) {
       try {
        let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers:headers})
        console.log(data);
        // setwishlist(Array.isArray(data?.data) ? data.data : []);
        // setwishlist(data)
        setwishlist((prevWishlist) => prevWishlist.filter(item => item._id !== productId));
        setWishlistIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(productId);
            return newSet;
          });
       
        toast.success(data.message);
    }
       catch (e) {
        console.log(e);
        toast.error("Failed to remove item from wishList, please try again!");
       }

   function redHeart(productId) {

    
   }    
}



// نشؤ  بيقا الفانكشن والداتا ال ي  فالمخزن مع  االناس  الي  بره 
return (
    <WishListContext.Provider value={{wishlist,setwishlist,getItemToWishList,addItemToWishList,removeWishListItem,wishlistIds}}>
        {children}
    </WishListContext.Provider>
)
}