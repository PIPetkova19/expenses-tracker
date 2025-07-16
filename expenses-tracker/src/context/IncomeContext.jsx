import { createContext, useState } from "react";

export const IncomeContext = createContext(null);

 export function IncomeProvider({ children }) {
   const [income, setIncome] = useState([]);
 
   return (
     <IncomeContext.Provider value={{ income, setIncome }}>
       {children}
     </IncomeContext.Provider>
   );
 }
 