import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import ExpensesTracker from "./ExpensesTracker";
import AddExpenses from "./AddExpenses";
import Login from "./Login";
import { useState } from "react";
import { ExpensesContext } from "./ExpensesContext"; 

function App() {
  const [expenses, setExpenses] = useState([]); //!

  return (
    <Router>
      <ExpensesContext.Provider value={{ expenses, setExpenses }}> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-expenses" element={<AddExpenses />} />
          <Route path="/track-expenses" element={<ExpensesTracker />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ExpensesContext.Provider>
    </Router>
  );
}

export default App;
