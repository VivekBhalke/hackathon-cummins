import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import ProtectedRoute from "./components/Protected-Route";
import Home from "./pages/home-page";
import QuizPage from "./pages/quiz-page";
import { Login } from "./pages/login-page";
import { Signup } from "./pages/sign-up-page";

function App() {
  const { isSignedIn } = useAuth();
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={isSignedIn ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={isSignedIn ? <Navigate to="/" replace /> : <Signup />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          // <ProtectedRoute>
          <Home />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/quiz"
        element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
