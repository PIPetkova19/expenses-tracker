import { createContext, useState } from "react";

export const ExpensesContext = createContext(null);

 export function ExpensesProvider({ children }) {
   const [expenses, setExpenses] = useState([]);
 
   return (
     <ExpensesContext.Provider value={{ expenses, setExpenses }}>
       {children}
     </ExpensesContext.Provider>
   );
 }
 