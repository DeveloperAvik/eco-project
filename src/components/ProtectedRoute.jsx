import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loadingAuth } = useContext(AuthContext);
  const loc = useLocation();

  if (loadingAuth) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black/60 backdrop-blur-xl animate-fadeIn">
        <div className="px-8 py-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-green-400/30 shadow-[0_0_25px_rgba(0,255,156,0.25)]">
          
          {/* Neon Loader */}
          <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4 drop-shadow-[0_0_12px_#00ff9c]" />

          <p className="text-gray-200 text-sm sm:text-base">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }

  return children;
}
