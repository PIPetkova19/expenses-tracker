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
import { IncomeProvider } from "./context/IncomeContext";
import AddIncome from "./main-pages/AddIncome";
import IncomeTracker from "./main-pages/IncomeTracker";
import IntroPage from "./main-pages/IntroPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ExpensesProvider>
          <IncomeProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<IntroPage />} />

              <Route path="/sign-in" element={<Signin />} />
              <Route path="/log-in" element={<Login />} />

              <Route path="/home" element={
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

              <Route path="/add-income" element={
                <ProtectedRoute>
                  <AddIncome />
                </ProtectedRoute>
              } />
              <Route path="/track-income" element={
                <ProtectedRoute>
                  <IncomeTracker />
                </ProtectedRoute>
              } />
            </Routes>
          </IncomeProvider>
        </ExpensesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
