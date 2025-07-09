import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Signin from "./Signin";
import ExpensesTracker from "./ExpensesTracker";
import AddExpenses from "./AddExpenses";
import Login from "./Login";
import { useState } from "react";
import { ExpensesContext } from "./ExpensesContext";
import { UserContext } from "./UserContext";

function App() {
  const [expenses, setExpenses] = useState([]); //!
  const [users, setUsers] = useState([]);
  return (
    <Router>
      <UserContext.Provider value={{ users, setUsers }}>
        <ExpensesContext.Provider value={{ expenses, setExpenses }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-expenses" element={<AddExpenses />} />
            <Route path="/track-expenses" element={<ExpensesTracker />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/sign-in" element={<Signin />} />
          </Routes>
        </ExpensesContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
