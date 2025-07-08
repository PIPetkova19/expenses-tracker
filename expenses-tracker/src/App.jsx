import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import ExpensesTracker from "./ExpensesTracker";
import AddExpenses from "./AddExpenses";
import Login from "./Login";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-expenses" element={<AddExpenses />} />
        <Route path="/track-expenses" element={<ExpensesTracker />} />       
       <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
