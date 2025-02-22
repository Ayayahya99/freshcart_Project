import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./components/Home/Home.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Categories from './components/Categories/Categories';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Layout from './components/Layout/Layout';
import Brands from './components/Brands/Brands';
import NotFound from './components/NotFound/NotFound'; // استيراد NotFound
import './App.css';
import UserContextProvider from '../context/UserContext.jsx';
import BrandContextProvider from '../context/BrandContext.jsx';
import UserContext from "../context/UserContext.jsx";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from '../context/CartContext.jsx';
import toast, {Toaster}  from 'react-hot-toast';
import { useEffect } from 'react';
import WishList from './components/WishList/WishList';
import WishListProvider from '../context/WishListContext.jsx';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ChickOut from './components/ChickOut/ChickOut';
import Allorders from './components/Allorders/Allorders.jsx';
import BrandsDetailes from './components/BrandsDetailes/BrandsDetailes';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const routers = createBrowserRouter([
  {
    // بصي  الاي  اوت  هو الكوبونانت  ال ي هيترن  فيه  كل   الاطفال  الي  تحته  
    // الانديكش  اهو الكومبونانت الي  عايزاه  يظهرلي  اول ما  افتح  
    path: '',
    element: <Layout />,
    children: [
     
      // بصي  عشان  احمي  الحته  بتاع   البروتيكتيد  روت من  الاول  يا  ايه 
      // بنعمل كومبونانت   اسمها  بروتكتد روت  دي  اي  كومبونانت   يعدي  عليها  الاول وه  يقول  نعدي ولا لا 
      {index :true, element: <Home /> },  //دي الصفحه  الي  هتطلع اول ما افتح  الابلكيشن 
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      // { path: 'home', element:  <ProtectedRoute><Home/></ProtectedRoute> },  //كده  بقوله روح للبروتيكتد روت  وخد الهوم فايديك  فاكره لما  قولنا ان هوم كده هيبقى ابن البروتكتيد وهيروحله  كابنه  فالبروبس ؟؟
      { path: 'cart', element:  <ProtectedRoute><Cart/></ProtectedRoute>},
      { path: 'wishlist', element:  <ProtectedRoute><WishList/></ProtectedRoute>},
      { path: 'categories', element: <ProtectedRoute><Categories/></ProtectedRoute> },
      { path: 'brands', element:  <ProtectedRoute><Brands/></ProtectedRoute> },
  
      { path: 'products', element: <ProtectedRoute><Products/></ProtectedRoute>},
      { path: 'chickout', element: <ProtectedRoute><ChickOut/></ProtectedRoute>},
      { path: 'allorders', element: <ProtectedRoute><Allorders/></ProtectedRoute>},
      { path: 'forgot-password', element: <ForgetPassword/>},
      { path: 'resetpassword', element: <ResetPassword/>},
      { path: 'productDetailes/:id', element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
      { path: '*', element: <NotFound /> },
    ],
  },
]);



// احنا  عايزين  من  الاخر  الصفحه  مش  كل  شويه  لما ارجعلها  تعمل  لودينج
// مع اني  انا الي طلبت  منها كده  الي  هو  اليوز ايفيكت  اول  ما  تفتح الصفحه  كلم الاباي وهات منها  الداتا 
// انا عايزه الداتا دي  تفضل  موجوده مش كل  شويه  اروح اجيبها  
// npm i @tanstack/react-query

const query = new QueryClient   // كده  كل  الحاجات والمكتبات  الي فال كويري  كلاينت  هتتخزن  فكويري 

function App() {
  
  
  
  return <> 
  
  {/* كده كل  الابلكيشن  كومبونانت  ولاد  اليزر كونتيكست الي  عملناه  */}
  {/* بصي  يقا الاب  قولنا بنعمل  فيه داتا  وابعتها  لاطفال  اليوزر  كونتيكست  */}
 <QueryClientProvider client={query}>   {/* كده  بمد الابلكيشن   بالمكتبات دي  زي الروتينج كده   فانا  كده اي  حد فالابلكيشن   يعرف  يستخدم المكتبات  دي   */}

 <WishListProvider>
  <Toaster/>  
  <CartContextProvider>
      
    <UserContextProvider> 
     <ReactQueryDevtools/>
     <RouterProvider router={routers}>
   

     </RouterProvider>
 
    </UserContextProvider> 
    </CartContextProvider>

  </WishListProvider>

 </QueryClientProvider>
 
 
 
    
  
 
  
  
  </>
  

  
  
 
}

export default App;
















// انا  لما  كان  عندي  من   الاول    داتاا    موجوده    مثلا  هنا  هبعتا  ببروميس  للاي  اوت وبعدين  ابعتها للوجين  مثلا حوار  كبير  وهفضل  انقلها  لحد  ما توصل  
// فطلع كريقه  ال  context
// الي هو والله همل مخزن كده  احط فيه الداتا والي  عايز  يوصل  للدانا  دي يكلم الكونتيكست 

// statemanagment 