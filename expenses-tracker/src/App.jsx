import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./side-pages/Navbar";
import Home from "./main-pages/Home";
import Signin from "./registration/Signin";
import ExpensesTracker from "./main-pages/ExpensesTracker";
import AddExpenses from "./main-pages/AddExpenses";
import Login from "./registration/Login";
import { ExpensesProvider } from "./context/ExpensesContext";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ExpensesProvider>
          <Navbar />
          <Routes>
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/add-expenses" element={
              <ProtectedRoute>
                <AddExpenses />
              </ProtectedRoute>
            } />
            <Route path="/track-expenses" element={
              <ProtectedRoute>
                <ExpensesTracker />
              </ProtectedRoute>
            } />
          </Routes>
        </ExpensesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
