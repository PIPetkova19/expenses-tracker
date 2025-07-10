import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./side-pages/Navbar";
import Home from "./main-pages/Home";
import Signin from "./registration/Signin";
import ExpensesTracker from "./main-pages/ExpensesTracker";
import AddExpenses from "./main-pages/AddExpenses";
import Login from "./registration/Login";
import { ExpensesProvider } from "./context/ExpensesContext";
import { UserProvider } from "./context/UserContext";

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
