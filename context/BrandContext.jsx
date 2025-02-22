import axios from "axios";
import { createContext } from "react";

export let BrandContext =createContext()

export default function BrandContextProvider({children}){

    // const [brsnds, setbrsnds] = useState(null)


     async function getBrand(brand){
         try {
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
             console.log(data)
         }
         catch (e){
            console.error(e)
         }
    }



    return (
        <BrandContext.Provider value={{ getBrand}}>

        </BrandContext.Provider>
    
    );

}


