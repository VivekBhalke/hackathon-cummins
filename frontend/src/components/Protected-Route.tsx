import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
