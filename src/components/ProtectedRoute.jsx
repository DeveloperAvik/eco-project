import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loadingAuth } = useContext(AuthContext);
  const loc = useLocation();

  if (loadingAuth) return <p className="p-4">Checking authentication...</p>;

  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />;

  return children;
}