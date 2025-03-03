import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isPending } from './../../node_modules/@reduxjs/toolkit/src/matchers';


let initialState ={isLoading : false ,products:[],error: null}

//عشان اي  دات اي  سونكرونس  جايخه من  بره  بجيبها  بالفانكشن  دي  

// كريت  اسينك صن  ده  بياخد الاكشن  ال ي كان بيرجع فالرديوس  لو  فاكره 
// فهو  بياخد  الميثود الي  بتريترن  الداتا    واسم الاسلايس  سلاش  اسم الفانكشن 

export let getProducts=createAsyncThunk('productSlice/getProducts',async()=>{
 let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
 console.log(data.data)
 return data.data
})

let productSlice = createSlice({
    name: "productSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{  //لولا  كده  لو  عمل ت  فانكشن بره   بستدعيها فابن  عم  الريديوسر  وببعتله  بيلدر  الي  هو بيعمل بيلد للكيسس 
    
        //  كان  عندنا  تلت  حالات 
        // يا اما  بيندينج   بنجيب  لسه الداتا  وهنا  هيعمل  لودينج
        // يا  الما الداتا جات  بالسلامه  فنعرضها  ونوقف اللودين
        // يا اما  ما جتش  وهنا ايرورو 
        // البيلدر  هو ال ي هيعمل التلت  حالات  دول  
          
        builder.addCase(getProducts.pending,(state,action )=>{  //فيقوله في  حاله  انه بيندينج عشان اكسيوس  كان  بترجع  تلت  حالات وهي  بتكول الببي  ا ي
            // المهم  بقوله  لو  بيندينج   شغل  الفانكشن  دي
            state.isLoading = true;
            

        })
        builder.addCase(getProducts.fulfilled,(state,action )=>{  //فيقوله في  حاله  انه بيندينج عشان اكسيوس  كان  بترجع  تلت  حالات وهي  بتكول الببي  ا ي
            // المهم  بقوله  لو  بيندينج   شغل  الفانكشن  دي
            state.isLoading = false;
            state.products = action.payload
            // state.products = "yes yes"


        })
        builder.addCase(getProducts.rejected,(state,action )=>{  //فيقوله في  حاله  انه بيندينج عشان اكسيوس  كان  بترجع  تلت  حالات وهي  بتكول الببي  ا ي
            // المهم  بقوله  لو  بيندينج   شغل  الفانكشن  دي
            state.isLoading = false;
            state.products = action.error
            // state.products = "nono"

        })

    },
})


export let productReducer=  productSlice.reducer;