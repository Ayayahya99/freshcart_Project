import { createContext, useState, useEffect } from "react";

// نعمل  المخزن  الي  هو الكونتيكست 
export const DarkModeContext = createContext();

// ✅ 2. إنشاء الـ Provider لتغليف التطبيق
// هنعمل  ستيت  اسمها  دارك مود وبنحط  فيها   انا فاللولك  سنوريج فالاول  هيكون  ترو
export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // ✅ حفظ الحالة في localStorage عند التغيير
//   لو  في  دارك مود  بترو عندي  فالللوكل  ستوريج حط فالكلاس دارك لو مش  موجوده  او بفولس  شيلها من الكلاس  ستايل 
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

//   ابعتها بقا  للناس   عشان  نستخدمها 

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}


// بعد  ما عملنا الكونتيكست    نعمل زرار   فالناف  بار   
// ونروح نخلي  الابلكيشن كله  يبروفايد الكونتيكست 
