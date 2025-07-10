import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Signin from "./Signin";
import ExpensesTracker from "./ExpensesTracker";
import AddExpenses from "./AddExpenses";
import Login from "./Login";
import { ExpensesProvider } from "./ExpensesContext";
import { UserProvider } from "./UserContext";

function App() {
 
  return (
    <Router>
    <UserProvider>    
          <ExpensesProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-expenses" element={<AddExpenses />} />
            <Route path="/track-expenses" element={<ExpensesTracker />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/sign-in" element={<Signin />} />
          </Routes>
        </ExpensesProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
